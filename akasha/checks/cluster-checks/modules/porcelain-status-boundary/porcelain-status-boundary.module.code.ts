import ts from "typescript"

const MACHINE_FORMAT_OPTIONS = ["porcelain", "short"]

const MACHINE_FORMAT_LETTER = "s"

function isMachineFormatFlag(arg: string): boolean {
  if (arg.startsWith("--")) {
    const name = arg.slice(2).split("=")[0] ?? ""
    return name.length > 0 && MACHINE_FORMAT_OPTIONS.some((option) => option.startsWith(name))
  }
  if (/^-[A-Za-z]+$/.test(arg)) return arg.slice(1).includes(MACHINE_FORMAT_LETTER)
  return false
}

const BOUNDARY_ARGS_NAME = "PORCELAIN_STATUS_ARGS"
const BOUNDARY_PARSERS = ["parsePorcelainStatusZ", "readPorcelainStatus"]

const GIT_STATUS_COMMAND = /\bgit\b[^\n;|&]*?\bstatus\b([^\n;|&)]*)/g

function namesMachineFormatCommand(text: string): boolean {
  for (const match of text.matchAll(GIT_STATUS_COMMAND)) {
    const afterStatus = match[1] ?? ""
    if (afterStatus.split(/\s+/).some((token) => isMachineFormatFlag(token))) return true
  }
  return false
}

export interface PorcelainBoundaryViolation {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly kind: "unsanctioned-flag" | "argv-without-parse"
  readonly snippet: string
}

function positionOf(
  sf: ts.SourceFile,
  node: ts.Node
): { readonly line: number; readonly column: number } {
  const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf))
  return { line: line + 1, column: character + 1 }
}

function literalText(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text
  if (ts.isTemplateExpression(node)) {
    return [node.head.text, ...node.templateSpans.map((s) => s.literal.text)].join(" ")
  }
  if (ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  return undefined
}

function arrayNamesStatusAndFlag(node: ts.ArrayLiteralExpression): boolean {
  const texts = node.elements.map((e) => literalText(e)).filter((t) => t !== undefined)
  return texts.includes("status") && texts.some((t) => isMachineFormatFlag(t))
}

function isBoundaryParseCall(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) return false
  const callee = node.expression
  if (ts.isIdentifier(callee)) return BOUNDARY_PARSERS.includes(callee.text)
  if (ts.isPropertyAccessExpression(callee)) return BOUNDARY_PARSERS.includes(callee.name.text)
  return false
}

function collectValueNames(node: ts.Node, into: Set<string>): undefined {
  if (ts.isPropertyAccessExpression(node)) return collectValueNames(node.expression, into)
  if (ts.isIdentifier(node)) {
    into.add(node.text)
    return undefined
  }
  ts.forEachChild(node, (child) => collectValueNames(child, into))
  return undefined
}

function bindingNames(name: ts.BindingName): readonly string[] {
  if (ts.isIdentifier(name)) return [name.text]
  const elements: readonly ts.Node[] = name.elements
  return elements.flatMap((element) =>
    ts.isBindingElement(element) ? bindingNames(element.name) : []
  )
}

const ARGV_CARRIERS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.ArrayLiteralExpression,
  ts.SyntaxKind.SpreadElement,
  ts.SyntaxKind.ParenthesizedExpression,
  ts.SyntaxKind.AsExpression,
  ts.SyntaxKind.SatisfiesExpression,
  ts.SyntaxKind.NonNullExpression,
  ts.SyntaxKind.TemplateSpan,
  ts.SyntaxKind.TemplateExpression,
])

type ArgvUse =
  | { readonly kind: "consumed"; readonly acquisition: ts.Node }
  | { readonly kind: "aliased"; readonly name: string }
  | { readonly kind: "escaped" }

function followArgvToReader(reference: ts.Node): ArgvUse {
  let child: ts.Node = reference
  const access = child.parent
  if (access !== undefined && ts.isPropertyAccessExpression(access) && access.name === child) {
    child = access
  }
  let parent: ts.Node | undefined = child.parent
  while (parent !== undefined) {
    if (ts.isCallExpression(parent) || ts.isNewExpression(parent)) {
      const args: readonly ts.Node[] = parent.arguments ?? []
      return args.includes(child) ? { kind: "consumed", acquisition: parent } : { kind: "escaped" }
    }
    if (ts.isTaggedTemplateExpression(parent)) {
      return parent.template === child
        ? { kind: "consumed", acquisition: parent }
        : { kind: "escaped" }
    }
    if (ts.isVariableDeclaration(parent) && parent.initializer === child) {
      return ts.isIdentifier(parent.name)
        ? { kind: "aliased", name: parent.name.text }
        : { kind: "escaped" }
    }
    if (ts.isPropertyAccessExpression(parent)) {
      if (parent.expression !== child) return { kind: "escaped" }
    } else if (!ARGV_CARRIERS.has(parent.kind)) {
      return { kind: "escaped" }
    }
    child = parent
    parent = parent.parent
  }
  return { kind: "escaped" }
}

type ResultFlow =
  | { readonly kind: "parsed" }
  | { readonly kind: "bound"; readonly names: readonly string[] }
  | { readonly kind: "unbound" }

function followResultToParse(acquisition: ts.Node): ResultFlow {
  let child: ts.Node = acquisition
  let parent: ts.Node | undefined = child.parent
  while (parent !== undefined) {
    if (isBoundaryParseCall(parent) && parent.arguments.some((arg) => arg === child)) {
      return { kind: "parsed" }
    }
    if (ts.isVariableDeclaration(parent) && parent.initializer === child) {
      return { kind: "bound", names: bindingNames(parent.name) }
    }
    const carries =
      ts.isAwaitExpression(parent) ||
      ts.isParenthesizedExpression(parent) ||
      ts.isNonNullExpression(parent) ||
      ts.isAsExpression(parent) ||
      ((ts.isPropertyAccessExpression(parent) || ts.isCallExpression(parent)) &&
        parent.expression === child)
    if (!carries) return { kind: "unbound" }
    child = parent
    parent = parent.parent
  }
  return { kind: "unbound" }
}

function isValueReference(node: ts.Identifier): boolean {
  const parent: ts.Node | undefined = node.parent
  if (parent === undefined) return false
  if (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) return false
  if (ts.isVariableDeclaration(parent) && parent.name === node) return false
  if (ts.isBindingElement(parent) && parent.name === node) return false
  if (ts.isPropertyAssignment(parent) && parent.name === node) return false
  return true
}

function readerText(acquisition: ts.Node, sf: ts.SourceFile): string {
  const callee = ts.isTaggedTemplateExpression(acquisition)
    ? acquisition.tag
    : ts.isCallExpression(acquisition) || ts.isNewExpression(acquisition)
      ? acquisition.expression
      : undefined
  return callee === undefined ? "this call" : callee.getText(sf).replace(/\s+/g, " ").slice(0, 60)
}

export function scanPorcelainStatusBoundary(
  rel: string,
  source: string
): readonly PorcelainBoundaryViolation[] {
  const sf = ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const violations: PorcelainBoundaryViolation[] = []
  const identifiers: ts.Identifier[] = []
  const parsedNames = new Set<string>()
  let reachesBoundaryParse = false

  const visit = (node: ts.Node): undefined => {
    if (ts.isIdentifier(node)) {
      identifiers.push(node)
      if (BOUNDARY_PARSERS.includes(node.text)) reachesBoundaryParse = true
    }

    if (isBoundaryParseCall(node)) {
      for (const argument of node.arguments) collectValueNames(argument, parsedNames)
    }

    if (ts.isArrayLiteralExpression(node) && arrayNamesStatusAndFlag(node)) {
      violations.push({
        file: rel,
        ...positionOf(sf, node),
        kind: "unsanctioned-flag",
        snippet: node.getText(sf).replace(/\s+/g, " ").slice(0, 120),
      })
    }

    const text = literalText(node)
    if (text !== undefined && namesMachineFormatCommand(text)) {
      violations.push({
        file: rel,
        ...positionOf(sf, node),
        kind: "unsanctioned-flag",
        snippet: text.replace(/\s+/g, " ").slice(0, 120),
      })
    }

    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(sf, visit)

  const pending = identifiers.filter((id) => id.text === BOUNDARY_ARGS_NAME && isValueReference(id))
  const followedAliases = new Set<string>()
  const judged = new Set<number>()
  let escapedAt: ts.Node | undefined

  while (pending.length > 0) {
    const reference = pending.pop()
    if (reference === undefined) break
    const use = followArgvToReader(reference)
    if (use.kind === "aliased") {
      if (followedAliases.has(use.name)) continue
      followedAliases.add(use.name)
      for (const alias of identifiers) {
        if (alias.text === use.name && isValueReference(alias)) pending.push(alias)
      }
      continue
    }
    if (use.kind === "escaped") {
      escapedAt ??= reference
      continue
    }
    const start = use.acquisition.getStart(sf)
    if (judged.has(start)) continue
    judged.add(start)

    const flow = followResultToParse(use.acquisition)
    if (flow.kind === "parsed") continue
    if (flow.kind === "bound" && flow.names.some((name) => parsedNames.has(name))) continue
    violations.push({
      file: rel,
      ...positionOf(sf, use.acquisition),
      kind: "argv-without-parse",
      snippet: `${BOUNDARY_ARGS_NAME} is read by ${readerText(use.acquisition, sf)} and what it returns never reaches a boundary parse (${BOUNDARY_PARSERS.join(" / ")}), so nothing stops the offsets being hand-rolled off it`,
    })
  }

  if (escapedAt !== undefined && !reachesBoundaryParse) {
    violations.push({
      file: rel,
      ...positionOf(sf, escapedAt),
      kind: "argv-without-parse",
      snippet: `${BOUNDARY_ARGS_NAME} leaves as text here, so its reader is not in this file, and no boundary parse (${BOUNDARY_PARSERS.join(" / ")}) is named in this file either`,
    })
  }

  return violations
}

export function scanPorcelainStatusBoundaryText(
  rel: string,
  source: string
): readonly PorcelainBoundaryViolation[] {
  const violations: PorcelainBoundaryViolation[] = []
  source.split("\n").forEach((line, i) => {
    if (!namesMachineFormatCommand(line)) return
    violations.push({
      file: rel,
      line: i + 1,
      column: 1,
      kind: "unsanctioned-flag",
      snippet: line.trim().slice(0, 120),
    })
  })
  return violations
}
