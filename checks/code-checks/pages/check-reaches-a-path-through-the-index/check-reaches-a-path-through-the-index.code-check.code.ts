import { lineOf, parsedAs } from "@akasha/code/code-source"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import ts from "typescript"
import {
  type Body,
  bodyOf,
  FILES,
  judgingEach,
  type Selector,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const CODE = "code"

const PARTED_BY = "/"

const MOST = 60

const SAID = "what sits under a path the index answers for is asked rather than listed"

const LISTING: ReadonlySet<string> = new Set(["readdirSync", "readdir", "Glob"])

export type Asking = (said: string) => string | null

type Reached = { readonly said: string; readonly at: string }

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
  const based = basedOn([...paths, ...foldersOf(paths)])
  return (said) => {
    if (!said.includes(PARTED_BY)) return null
    if (said.startsWith(PARTED_BY) || said.startsWith(".")) return null
    const at = said.endsWith(PARTED_BY) ? said.slice(0, -PARTED_BY.length) : said
    const base = at.slice(at.lastIndexOf(PARTED_BY) + 1)
    for (const one of based.get(base) ?? []) {
      if (one === at || one.endsWith(`${PARTED_BY}${at}`)) return one
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
  const at = asking(node.text)
  return at === null ? null : { said: node.text, at }
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
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined
    ) {
      const kept = found.get(node.name.text)
      if (kept === undefined) found.set(node.name.text, [node.initializer])
      else kept.push(node.initializer)
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

export function reasonsIn(asking: Asking, path: string, text: string): readonly string[] {
  const source = parsedAs(path, text)
  const held = heldIn(source, asking)
  const said: string[] = []
  const visit = (node: ts.Node): undefined => {
    for (const one of listedBy(node)) {
      const found = reachedIn(one, asking, held)
      if (found === null) continue
      said.push(
        `line ${lineOf(source, node)} lists \`${shortened(found.said)}\`, ` +
          `where \`${found.at}\` sits — ${SAID}`
      )
      break
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return said
}

export function judgedBy(shadow: Shadow): (path: string) => boolean {
  const types = shadow.index.pageTypesIn()
  return (path) => {
    const said = partedIn(path)
    if (said === null || !types.has(said.pageType)) return false
    return said.sections.length === 1 && said.sections[0] === CODE
  }
}

const JUDGED = new WeakMap<Shadow, (path: string) => boolean>()

function judgedFor(shadow: Shadow): (path: string) => boolean {
  const found = JUDGED.get(shadow)
  if (found !== undefined) return found
  const made = judgedBy(shadow)
  JUDGED.set(shadow, made)
  return made
}

const ASKING = new WeakMap<Shadow, Asking>()

function askingFor(shadow: Shadow): Asking {
  const found = ASKING.get(shadow)
  if (found !== undefined) return found
  const made = askingOver(shadow.index.everyPath())
  ASKING.set(shadow, made)
  return made
}

export const PAGE_CODE: Selector<Body> = {
  named: "the code a page runs",
  isInput: (path, shadow) => judgedFor(shadow)(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => judgedFor(shadow)(one.path)),
}

export const checkReachesAPathThroughTheIndex = judgingEach(PAGE_CODE, (given, shadow) =>
  reasonsIn(askingFor(shadow), given.path, bodyOf(given))
)
