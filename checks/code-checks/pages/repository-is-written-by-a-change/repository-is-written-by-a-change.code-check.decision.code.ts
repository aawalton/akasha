import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { lineOf, parsedAs } from "@akasha/code/code-source"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import ts from "typescript"
import { textNamed } from "../../../modules/change-walking/change-walking.module.code.ts"

const DOMAIN = "domain"

const CHANGE = "change"

const COMMAND = "command"

const ROOT_MODULES = new Set(["checkout-roots", "code-root"])

const ROOT = "root"

const CODE = "code"

const FS = new Set(["fs", "fs/promises", "node:fs", "node:fs/promises"])

const AWAY = new Set(["os", "node:os"])

const BUN_WRITE = "Bun.write"

const BUN = "Bun"

const WRITE = "write"

const PARTED_BY = "/"

const DOT = "."

const SAID = "and only a change writes the repository"

const IGNORE_AT = ".gitignore"

const GIT = ".git"

const UN_IGNORED = "!"

const NOTED = "#"

const ANY = "*"

const OPENING = /^\/+/

const CLOSING = /\/+$/

export function asideIn(text: string): readonly string[] {
  const found = new Set<string>([GIT])
  for (const line of text.split("\n")) {
    const said = line.trim()
    if (said === "" || said.startsWith(NOTED) || said.startsWith(UN_IGNORED)) continue
    const bare = said.replaceAll(ANY, "").replace(OPENING, "").replace(CLOSING, "")
    if (bare !== "") found.add(bare)
  }
  return [...found]
}

export function asideAt(root: string): readonly string[] {
  return asideIn(readFileSync(join(root, IGNORE_AT), "utf8"))
}

const WRITES = new Map<string, readonly number[]>([
  ["appendFile", [0]],
  ["appendFileSync", [0]],
  ["copyFile", [1]],
  ["copyFileSync", [1]],
  ["cp", [1]],
  ["cpSync", [1]],
  ["createWriteStream", [0]],
  ["link", [1]],
  ["linkSync", [1]],
  ["rename", [0, 1]],
  ["renameSync", [0, 1]],
  ["rm", [0]],
  ["rmSync", [0]],
  ["rmdir", [0]],
  ["rmdirSync", [0]],
  ["symlink", [1]],
  ["symlinkSync", [1]],
  ["truncate", [0]],
  ["truncateSync", [0]],
  ["unlink", [0]],
  ["unlinkSync", [0]],
  ["writeFile", [0]],
  ["writeFileSync", [0]],
])

type Taken = {
  readonly writes: ReadonlyMap<string, readonly number[]>
  readonly spaces: ReadonlySet<string>
  readonly rooted: ReadonlySet<string>
  readonly away: ReadonlySet<string>
}

function slugOf(specifier: string): string {
  const last = specifier.slice(specifier.lastIndexOf(PARTED_BY) + 1)
  const dot = last.indexOf(DOT)
  return dot < 0 ? last : last.slice(0, dot)
}

function boundIn(clause: ts.ImportClause): readonly ts.ImportSpecifier[] {
  const held = clause.namedBindings
  if (held === undefined || !ts.isNamedImports(held)) return []
  return [...held.elements]
}

function namedOf(clause: ts.ImportClause): readonly string[] {
  const found: string[] = []
  if (clause.name !== undefined) found.push(clause.name.text)
  const held = clause.namedBindings
  if (held !== undefined && ts.isNamespaceImport(held)) found.push(held.name.text)
  for (const one of boundIn(clause)) found.push(one.name.text)
  return found
}

function takenIn(source: ts.SourceFile): Taken {
  const writes = new Map<string, readonly number[]>()
  const spaces = new Set<string>()
  const rooted = new Set<string>()
  const away = new Set<string>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const clause = one.importClause
    if (clause === undefined || !ts.isStringLiteral(one.moduleSpecifier)) continue
    const specifier = one.moduleSpecifier.text
    if (ROOT_MODULES.has(slugOf(specifier))) {
      for (const named of namedOf(clause)) rooted.add(named)
    }
    if (AWAY.has(specifier)) {
      for (const named of namedOf(clause)) away.add(named)
    }
    if (!FS.has(specifier)) continue
    if (clause.name !== undefined) spaces.add(clause.name.text)
    const held = clause.namedBindings
    if (held !== undefined && ts.isNamespaceImport(held)) spaces.add(held.name.text)
    for (const element of boundIn(clause)) {
      const at = WRITES.get((element.propertyName ?? element.name).text)
      if (at !== undefined) writes.set(element.name.text, at)
    }
  }
  return { writes, spaces, rooted, away }
}

function heldIn(node: ts.Node, held: (one: ts.Node) => boolean): boolean {
  let found = held(node)
  const walk = (one: ts.Node): undefined => {
    if (found) return
    if (held(one)) {
      found = true
      return
    }
    ts.forEachChild(one, walk)
  }
  ts.forEachChild(node, walk)
  return found
}

function namesIn(node: ts.Node): ReadonlySet<string> {
  const found = new Set<string>()
  const walk = (one: ts.Node): undefined => {
    if (ts.isIdentifier(one)) found.add(one.text)
    ts.forEachChild(one, walk)
  }
  walk(node)
  return found
}

type Stated = {
  readonly name: string
  readonly names: ReadonlySet<string>
  readonly node: ts.Node
}

function boundOf(node: ts.Node): Stated | null {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer !== undefined
  ) {
    return { name: node.name.text, names: namesIn(node.initializer), node: node.initializer }
  }
  if (
    ts.isBinaryExpression(node) &&
    node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
    ts.isIdentifier(node.left)
  ) {
    return { name: node.left.text, names: namesIn(node.right), node: node.right }
  }
  return null
}

function statedIn(source: ts.SourceFile): readonly Stated[] {
  const found: Stated[] = []
  const walk = (node: ts.Node): undefined => {
    const one = boundOf(node)
    if (one !== null) found.push(one)
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

function answeringIn(source: ts.SourceFile): readonly Stated[] {
  const found: Stated[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined && node.body !== undefined) {
      found.push({ name: node.name.text, names: namesIn(node.body), node: node.body })
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

function spreadOver(
  stated: readonly Stated[],
  seeded: ReadonlySet<string>,
  held: (node: ts.Node) => boolean
): ReadonlySet<string> {
  const found = new Set(seeded)
  for (const one of stated) {
    if (heldIn(one.node, held)) found.add(one.name)
  }
  let turned = true
  while (turned) {
    turned = false
    for (const one of stated) {
      if (found.has(one.name)) continue
      for (const named of one.names) {
        if (!found.has(named)) continue
        found.add(one.name)
        turned = true
        break
      }
    }
  }
  return found
}

function textIn(node: ts.Node): string | null {
  if (ts.isStringLiteralLike(node)) return node.text
  if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
    return node.text
  }
  return null
}

export function namesAside(said: string, one: string): boolean {
  for (let at = said.indexOf(one); at >= 0; at = said.indexOf(one, at + 1)) {
    const before = at === 0 ? PARTED_BY : said[at - 1]
    const after = said[at + one.length] ?? PARTED_BY
    const opens = one.startsWith(DOT) || before === PARTED_BY
    const closes = one.endsWith(DOT) || after === PARTED_BY || after === DOT
    if (opens && closes) return true
  }
  return false
}

function asideBy(aside: readonly string[]): (node: ts.Node) => boolean {
  return (node) => {
    const said = textIn(node)
    return said !== null && aside.some((one) => namesAside(said, one))
  }
}

function calledAs(node: ts.CallExpression, taken: Taken): readonly number[] | null {
  const held = node.expression
  if (ts.isIdentifier(held)) return taken.writes.get(held.text) ?? null
  if (!ts.isPropertyAccessExpression(held) || !ts.isIdentifier(held.expression)) return null
  const named = held.name.text
  if (held.expression.text === BUN && named === WRITE) return [0]
  if (!taken.spaces.has(held.expression.text)) return null
  return WRITES.get(named) ?? null
}

function noNode(): boolean {
  return false
}

function holdsName(node: ts.Node): boolean {
  return textIn(node) !== null
}

function pointsRoot(node: ts.Node): boolean {
  return ts.isPropertyAccessExpression(node) && node.name.text === ROOT
}

export function reasonsOver(at: string, text: string, aside: readonly string[]): readonly string[] {
  const source = parsedAs(at, text)
  const taken = takenIn(source)
  const bun = text.includes(BUN_WRITE)
  if (taken.writes.size === 0 && taken.spaces.size === 0 && !bun) return []
  const stated = statedIn(source)
  const rooted = spreadOver(stated, taken.rooted, pointsRoot)
  const asideNamed = asideBy(aside)
  const named = spreadOver(stated, new Set<string>(), asideNamed)
  const away = spreadOver([...stated, ...answeringIn(source)], taken.away, noNode)
  const spelled = spreadOver(stated, new Set<string>(), holdsName)
  const isRooted = (one: ts.Node): boolean =>
    pointsRoot(one) || (ts.isIdentifier(one) && rooted.has(one.text))
  const isAside = (one: ts.Node): boolean =>
    asideNamed(one) || (ts.isIdentifier(one) && named.has(one.text))
  const isAway = (one: ts.Node): boolean => ts.isIdentifier(one) && away.has(one.text)
  const isSpelled = (one: ts.Node): boolean =>
    holdsName(one) || (ts.isIdentifier(one) && spelled.has(one.text))
  const said: string[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      for (const which of calledAs(node, taken) ?? []) {
        const given = node.arguments[which]
        if (given === undefined) continue
        if (!heldIn(given, isRooted) || !heldIn(given, isSpelled)) continue
        if (heldIn(given, isAside) || heldIn(given, isAway)) continue
        said.push(`line ${lineOf(source, node)} writes under the checkout root, ${SAID}`)
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return said
}

export function reasonsOf(root: string): (at: string, text: string) => readonly string[] {
  const aside = asideAt(root)
  return (at, text) => reasonsOver(at, text, aside)
}

function folderOf(shadow: Shadow, slug: string): string {
  for (const kind of shadow.index.kindsUnder(DOMAIN)) {
    const one = shadow.index.listedAt(kind, slug)[0]
    if (one !== undefined) return `${dirname(one.path)}${PARTED_BY}`
  }
  throw new Error(
    `the index names \`${slug}\` under no page type below \`${DOMAIN}\`, so nothing says where a change is made`
  )
}

function codeNamed(path: string): boolean {
  if (!textNamed(path)) return false
  const said = partedIn(path)
  return said !== null && said.sections.length === 1 && said.sections[0] === CODE
}

export function outsideBy(shadow: Shadow): (path: string) => boolean {
  const changes = folderOf(shadow, CHANGE)
  const commands = folderOf(shadow, COMMAND)
  return (path) => codeNamed(path) && !path.startsWith(changes) && !path.startsWith(commands)
}
