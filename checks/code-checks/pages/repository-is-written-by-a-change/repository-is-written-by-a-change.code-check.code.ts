import { dirname } from "node:path"
import { lineOf, parsedAs } from "@akasha/code/code-source"
import type { Shadow } from "@akasha/pages/shadow"
import ts from "typescript"
import {
  judgingEach,
  type Selector,
  TEXTS,
  type Text,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const PACKAGE = "workspace-package"

const CHANGE = "change"

const COMMAND_SYSTEM = "command-system"

const ROOT_MODULES = new Set(["checkout-roots", "code-root"])

const ROOT = "root"

const FS = new Set(["fs", "fs/promises", "node:fs", "node:fs/promises"])

const BUN_WRITE = "Bun.write"

const BUN = "Bun"

const WRITE = "write"

const PARTED_BY = "/"

const DOT = "."

const SAID = "and only a change writes the repository"

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
  ["mkdir", [0]],
  ["mkdirSync", [0]],
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

export type Taken = {
  readonly writes: ReadonlyMap<string, readonly number[]>
  readonly spaces: ReadonlySet<string>
  readonly rooted: ReadonlySet<string>
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

export function takenIn(source: ts.SourceFile): Taken {
  const writes = new Map<string, readonly number[]>()
  const spaces = new Set<string>()
  const rooted = new Set<string>([ROOT])
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const clause = one.importClause
    if (clause === undefined || !ts.isStringLiteral(one.moduleSpecifier)) continue
    const specifier = one.moduleSpecifier.text
    if (ROOT_MODULES.has(slugOf(specifier))) {
      for (const named of namedOf(clause)) rooted.add(named)
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
  return { writes, spaces, rooted }
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

export function rootedOver(
  source: ts.SourceFile,
  seeded: ReadonlySet<string>
): ReadonlySet<string> {
  const stated: { readonly name: string; readonly names: ReadonlySet<string> }[] = []
  const walk = (node: ts.Node): undefined => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined
    ) {
      stated.push({ name: node.name.text, names: namesIn(node.initializer) })
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  const found = new Set(seeded)
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

function tsNamed(node: ts.Node): boolean {
  if (ts.isStringLiteralLike(node)) return textNamed(node.text)
  if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
    return textNamed(node.text)
  }
  return false
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

export function reasonsIn(at: string, text: string): readonly string[] {
  const source = parsedAs(at, text)
  const taken = takenIn(source)
  const bun = text.includes(BUN_WRITE)
  if (taken.writes.size === 0 && taken.spaces.size === 0 && !bun) return []
  const rooted = rootedOver(source, taken.rooted)
  const said: string[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      for (const which of calledAs(node, taken) ?? []) {
        const given = node.arguments[which]
        if (given === undefined) continue
        if (!heldIn(given, (one) => ts.isIdentifier(one) && rooted.has(one.text))) continue
        if (!heldIn(given, tsNamed)) continue
        said.push(
          `line ${lineOf(source, node)} writes a TypeScript file under the checkout root, ${SAID}`
        )
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return said
}

function folderOf(shadow: Shadow, slug: string): string {
  const one = shadow.index.listedAt(PACKAGE, slug)[0]
  if (one === undefined) {
    throw new Error(
      `the index names no \`${PACKAGE}${PARTED_BY}${slug}\`, so nothing says where a change is made`
    )
  }
  return `${dirname(one.path)}${PARTED_BY}`
}

export function outsideBy(shadow: Shadow): (path: string) => boolean {
  const changes = folderOf(shadow, CHANGE)
  const commands = folderOf(shadow, COMMAND_SYSTEM)
  return (path) => textNamed(path) && !path.startsWith(changes) && !path.startsWith(commands)
}

const OUTSIDE_BY = new WeakMap<Shadow, (path: string) => boolean>()

function outsideFor(shadow: Shadow): (path: string) => boolean {
  const found = OUTSIDE_BY.get(shadow)
  if (found !== undefined) return found
  const made = outsideBy(shadow)
  OUTSIDE_BY.set(shadow, made)
  return made
}

export const OUTSIDE: Selector<Text> = {
  named: "the code outside the changes",
  isInput: (path, shadow) => outsideFor(shadow)(path),
  from: (change, shadow) =>
    TEXTS.from(change, shadow).filter((one) => outsideFor(shadow)(one.path)),
}

export const repositoryIsWrittenByAChange = judgingEach(OUTSIDE, (given) =>
  reasonsIn(given.path, given.text)
)
