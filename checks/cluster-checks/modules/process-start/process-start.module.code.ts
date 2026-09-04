import ts from "typescript"

export interface ProcessStart {
  readonly line: number
  readonly callee: string
  readonly program: string | null
}

const CHILD_PROCESS_SPECIFIERS: ReadonlySet<string> = new Set([
  "node:child_process",
  "child_process",
])

const BUN_SPAWN_PROPERTIES: ReadonlySet<string> = new Set(["spawn", "spawnSync"])

const BUN_SHELL_PROPERTY = "$"

const REQUIRED_SUBSTRINGS: readonly string[] = [
  "spawn",
  "exec",
  "fork",
  "child_process",
  "$`",
  "Bun.$",
]

export function cannotHoldProcessStart(content: string): boolean {
  return !REQUIRED_SUBSTRINGS.some((token) => content.includes(token))
}

interface ImportedBindings {
  readonly starters: ReadonlySet<string>
  readonly namespaces: ReadonlySet<string>
  readonly shellTags: ReadonlySet<string>
}

function collectImports(sf: ts.SourceFile): ImportedBindings {
  const starters = new Set<string>()
  const namespaces = new Set<string>()
  const shellTags = new Set<string>()

  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const specifier = statement.moduleSpecifier
    if (!ts.isStringLiteral(specifier)) continue
    const isChildProcess = CHILD_PROCESS_SPECIFIERS.has(specifier.text)
    const isBun = specifier.text === "bun"
    if (!isChildProcess && !isBun) continue

    const clause = statement.importClause
    if (clause === undefined) continue
    if (isChildProcess && clause.name !== undefined) namespaces.add(clause.name.text)

    const bindings = clause.namedBindings
    if (bindings === undefined) continue
    if (ts.isNamespaceImport(bindings)) {
      if (isChildProcess) namespaces.add(bindings.name.text)
      continue
    }
    for (const element of bindings.elements) {
      const imported = (element.propertyName ?? element.name).text
      if (isChildProcess) starters.add(element.name.text)
      else if (imported === BUN_SHELL_PROPERTY) shellTags.add(element.name.text)
    }
  }

  return { starters, namespaces, shellTags }
}

function calleeNameOf(expr: ts.Expression): string | undefined {
  if (ts.isIdentifier(expr)) return expr.text
  if (ts.isPropertyAccessExpression(expr)) {
    if (ts.isIdentifier(expr.expression)) return `${expr.expression.text}.${expr.name.text}`
    return expr.name.text
  }
  return undefined
}

function literalTextOf(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  return null
}

function firstWord(text: string): string | null {
  const word = text.trim().split(/\s+/)[0]
  return word === undefined || word === "" ? null : word
}

function bunArgvHead(arg: ts.Expression): string | null {
  if (ts.isArrayLiteralExpression(arg)) {
    const first = arg.elements[0]
    return first === undefined ? null : literalTextOf(first)
  }
  if (ts.isObjectLiteralExpression(arg)) {
    for (const property of arg.properties) {
      if (!ts.isPropertyAssignment(property)) continue
      if (!ts.isIdentifier(property.name) || property.name.text !== "cmd") continue
      return bunArgvHead(property.initializer)
    }
    return null
  }
  return literalTextOf(arg)
}

const COMMAND_LINE_STARTERS: ReadonlySet<string> = new Set(["exec", "execSync"])

function nodeProgram(name: string, arg: ts.Expression | undefined): string | null {
  if (arg === undefined) return null
  const literal = literalTextOf(arg)
  if (literal === null) return null
  return COMMAND_LINE_STARTERS.has(name) ? firstWord(literal) : literal
}

function shellTagProgram(template: ts.TemplateLiteral): string | null {
  if (ts.isNoSubstitutionTemplateLiteral(template)) return firstWord(template.text)
  const head = template.head.text
  return /\s/.test(head) ? firstWord(head) : null
}

export function scanProcessStarts(sf: ts.SourceFile): readonly ProcessStart[] {
  const { starters, namespaces, shellTags } = collectImports(sf)
  const out: ProcessStart[] = []

  const record = (node: ts.Node, callee: string, program: string | null): undefined => {
    const { line } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
    out.push({ line: line + 1, callee, program })
    return
  }

  function visit(node: ts.Node): undefined {
    if (ts.isTaggedTemplateExpression(node)) {
      const tag = node.tag
      const isBunShell =
        (ts.isIdentifier(tag) && shellTags.has(tag.text)) ||
        (ts.isPropertyAccessExpression(tag) &&
          ts.isIdentifier(tag.expression) &&
          tag.expression.text === "Bun" &&
          tag.name.text === BUN_SHELL_PROPERTY)
      if (isBunShell) {
        record(node, calleeNameOf(tag) ?? BUN_SHELL_PROPERTY, shellTagProgram(node.template))
      }
    }

    if (ts.isCallExpression(node)) {
      const expr = node.expression
      const first = node.arguments[0]
      if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.expression)) {
        const object = expr.expression.text
        const member = expr.name.text
        if (object === "Bun" && BUN_SPAWN_PROPERTIES.has(member)) {
          record(node, `Bun.${member}`, first === undefined ? null : bunArgvHead(first))
        } else if (namespaces.has(object)) {
          record(node, `${object}.${member}`, nodeProgram(member, first))
        }
      } else if (ts.isIdentifier(expr) && starters.has(expr.text)) {
        record(node, expr.text, nodeProgram(expr.text, first))
      }
    }

    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}

export function processStartsIn(path: string, content: string): readonly ProcessStart[] {
  if (cannotHoldProcessStart(content)) return []
  const kind = path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  return scanProcessStarts(ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true, kind))
}
