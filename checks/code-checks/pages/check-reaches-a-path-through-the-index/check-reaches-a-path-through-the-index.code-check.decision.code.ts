import { lineOf, parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"
import { typed } from "akasha/code-system/code-typing/code-typing.module.code.ts"
import { runsIn } from "akasha/code-system/path-runs/path-runs.module.code.ts"
import { partedIn, uncommittedHeld } from "akasha/pages/file-name/page-file-name.module.code.ts"
import ts from "typescript"

const CODE = "code"

const TEST = "test"

const PARTED_BY = "/"

const MOST = 60

const SAID = "what sits under a path the index answers for is asked rather than listed"

const SPELT = "where a page the index answers for sits is asked rather than spelled"

const LISTING: ReadonlySet<string> = new Set(["readdirSync", "readdir", "Glob"])

type Found = { readonly at: string; readonly page: boolean }

export type Asking = (said: string) => Found | null

type Reached = { readonly said: string; readonly at: string; readonly page: boolean }

function shortened(said: string): string {
  return said.length > MOST ? `${said.slice(0, MOST)}…` : said
}

export function foldersOf(paths: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const one of paths) {
    let at = one.lastIndexOf(PARTED_BY)
    while (at > 0) {
      found.add(one.slice(0, at))
      at = one.lastIndexOf(PARTED_BY, at - 1)
    }
  }
  return [...found]
}

export function basedOn(paths: readonly string[]): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of paths) {
    const base = one.slice(one.lastIndexOf(PARTED_BY) + 1)
    const held = found.get(base)
    if (held === undefined) found.set(base, [one])
    else held.push(one)
  }
  return found
}

export function askingOver(paths: readonly string[]): Asking {
  const pages = new Set(paths)
  const based = basedOn([...paths, ...foldersOf(paths)])
  return (said) => {
    if (!said.includes(PARTED_BY)) return null
    if (said.startsWith(PARTED_BY) || said.startsWith(".")) return null
    const closed = said.endsWith(PARTED_BY)
    const at = closed ? said.slice(0, -PARTED_BY.length) : said
    const base = at.slice(at.lastIndexOf(PARTED_BY) + 1)
    for (const one of based.get(base) ?? []) {
      if (one === at || one.endsWith(`${PARTED_BY}${at}`)) {
        return { at: one, page: !closed && pages.has(one) }
      }
    }
    return null
  }
}

function specified(node: ts.Node): boolean {
  const up = node.parent
  if (up === undefined) return false
  if (ts.isImportDeclaration(up) || ts.isExportDeclaration(up)) return up.moduleSpecifier === node
  if (ts.isLiteralTypeNode(up)) return up.parent !== undefined && ts.isImportTypeNode(up.parent)
  return ts.isCallExpression(up) && up.expression.kind === ts.SyntaxKind.ImportKeyword
}

function namingIn(node: ts.Node, asking: Asking): Reached | null {
  if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) return null
  if (specified(node)) return null
  const found = asking(node.text)
  return found === null ? null : { said: node.text, at: found.at, page: found.page }
}

function reachedIn(
  node: ts.Node,
  asking: Asking,
  held: ReadonlyMap<string, Reached>
): Reached | null {
  const own = namingIn(node, asking)
  if (own !== null) return own
  if (ts.isIdentifier(node)) return held.get(node.text) ?? null
  if (ts.isPropertyAccessExpression(node)) return reachedIn(node.expression, asking, held)
  return ts.forEachChild(node, (one) => reachedIn(one, asking, held) ?? undefined) ?? null
}

function writtenIn(source: ts.SourceFile): ReadonlyMap<string, readonly ts.Expression[]> {
  const found = new Map<string, ts.Expression[]>()
  const keep = (name: ts.BindingName, from: ts.Expression): undefined => {
    if (ts.isIdentifier(name)) {
      const kept = found.get(name.text)
      if (kept === undefined) found.set(name.text, [from])
      else kept.push(from)
    }
  }
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
      keep(node.name, node.initializer)
    }
    if (ts.isForOfStatement(node) && ts.isVariableDeclarationList(node.initializer)) {
      for (const one of node.initializer.declarations) keep(one.name, node.expression)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

export function heldIn(source: ts.SourceFile, asking: Asking): ReadonlyMap<string, Reached> {
  const written = writtenIn(source)
  const held = new Map<string, Reached>()
  let more = true
  while (more) {
    more = false
    for (const [name, each] of written) {
      if (held.has(name)) continue
      for (const one of each) {
        const found = reachedIn(one, asking, held)
        if (found === null) continue
        held.set(name, found)
        more = true
        break
      }
    }
  }
  return held
}

function calledAs(node: ts.Expression): string | null {
  if (ts.isIdentifier(node)) return node.text
  if (ts.isPropertyAccessExpression(node)) return node.name.text
  return null
}

function listedBy(node: ts.Node): readonly ts.Expression[] {
  if (!ts.isCallExpression(node) && !ts.isNewExpression(node)) return []
  const named = calledAs(node.expression)
  if (named === null || !LISTING.has(named)) return []
  return [...(node.arguments ?? [])]
}

function typedIn(asking: Asking, path: string, text: string): readonly string[] {
  const source = parsedAs(path, text)
  const held = heldIn(source, asking)
  const said: string[] = []
  const visit = (node: ts.Node): undefined => {
    for (const one of listedBy(node)) {
      const found = reachedIn(one, asking, held)
      if (found === null || found.page) continue
      said.push(
        `line ${lineOf(source, node)} lists \`${shortened(found.said)}\`, ` +
          `where \`${found.at}\` sits — ${SAID}`
      )
      break
    }
    const own = namingIn(node, asking)
    if (own?.page === true) {
      said.push(
        `line ${lineOf(source, node)} spells \`${shortened(own.said)}\`, ` +
          `where the page \`${own.at}\` sits — ${SPELT}`
      )
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return said
}

function ranIn(asking: Asking, text: string): readonly string[] {
  const said: string[] = []
  for (const run of runsIn(text)) {
    for (const one of run.said) {
      const found = asking(one)
      if (found === null || !found.page) continue
      said.push(
        `line ${run.line} spells \`${shortened(one)}\`, ` +
          `where the page \`${found.at}\` sits — ${SPELT}`
      )
      break
    }
  }
  return said
}

export function reasonsIn(asking: Asking, path: string, text: string): readonly string[] {
  return typed(path) ? typedIn(asking, path, text) : ranIn(asking, text)
}

export function judgedBy(types: ReadonlySet<string>): (path: string) => boolean {
  return (path) => {
    const said = partedIn(path)
    if (said === null || !types.has(said.pageType)) return false
    const last = said.sections[said.sections.length - 1]
    return last === CODE || last === TEST
  }
}

export type Asked = {
  readonly types: ReadonlySet<string>
  readonly listed: (path: string) => boolean
  readonly generated: (path: string) => boolean
}

export function judgingOver(asked: Asked): (path: string) => boolean {
  const coded = judgedBy(asked.types)
  return (path) => {
    if (typed(path)) return coded(path)
    if (uncommittedHeld(path)) return false
    return asked.listed(path) && !asked.generated(path)
  }
}
