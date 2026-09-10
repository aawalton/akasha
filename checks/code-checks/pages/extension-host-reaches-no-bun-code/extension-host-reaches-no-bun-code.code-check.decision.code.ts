import { dirname, join, normalize } from "node:path"
import { skimmedAs } from "@akasha/code/code-source"
import { landingOf, type Naming } from "@akasha/code/code-specifier"
import { reachesIn, reachingOver } from "@akasha/code/package-manifest"
import type { Change } from "@akasha/pages/change"
import ts from "typescript"
import { textIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

export const MANIFEST = "editor-extension/ops-extension/package.json"

const NAMED = "package.json"

const VENDORED = "node_modules"

const MAIN = "main"

const BUN = "bun:"

const GLOBAL = "Bun"

const SHOWN = 5

const HOST = "the editor loads this graph into node, which holds no bun"

function erasedImport(clause: ts.ImportClause | undefined): boolean {
  if (clause === undefined) return false
  if (clause.isTypeOnly) return true
  if (clause.name !== undefined) return false
  const bound = clause.namedBindings
  if (bound === undefined || !ts.isNamedImports(bound)) return false
  return bound.elements.length > 0 && bound.elements.every((one) => one.isTypeOnly)
}

function erasedExport(one: ts.ExportDeclaration): boolean {
  if (one.isTypeOnly) return true
  const clause = one.exportClause
  if (clause === undefined || !ts.isNamedExports(clause)) return false
  return clause.elements.length > 0 && clause.elements.every((each) => each.isTypeOnly)
}

function specifierOf(node: ts.Node): string | null {
  if (ts.isImportDeclaration(node)) {
    if (erasedImport(node.importClause) || !ts.isStringLiteral(node.moduleSpecifier)) return null
    return node.moduleSpecifier.text
  }
  if (ts.isExportDeclaration(node)) {
    const said = node.moduleSpecifier
    if (said === undefined || !ts.isStringLiteral(said) || erasedExport(node)) return null
    return said.text
  }
  if (!ts.isCallExpression(node) || node.expression.kind !== ts.SyntaxKind.ImportKeyword)
    return null
  const said = node.arguments[0]
  return said !== undefined && ts.isStringLiteral(said) ? said.text : null
}

export function loadedIn(at: string, text: string): readonly string[] {
  const source = skimmedAs(at, text)
  const found: string[] = []
  const over = (node: ts.Node): undefined => {
    const said = specifierOf(node)
    if (said !== null) found.push(said)
    ts.forEachChild(node, over)
  }
  ts.forEachChild(source, over)
  return found
}

export function readsGlobal(at: string, text: string): boolean {
  const source = skimmedAs(at, text)
  let found = false
  const over = (node: ts.Node): undefined => {
    if (found) return
    if (ts.isIdentifier(node) && node.text === GLOBAL) {
      found = true
      return
    }
    ts.forEachChild(node, over)
  }
  ts.forEachChild(source, over)
  return found
}

export function namingOver(change: Change, paths: readonly string[]): Naming {
  const found: ReadonlyMap<string, string>[] = []
  for (const path of paths) {
    if (path !== NAMED && !path.endsWith(`/${NAMED}`)) continue
    if (path.split("/").includes(VENDORED)) continue
    const text = textIn(change, path)
    if (text === null) continue
    const folder = dirname(path)
    found.push(reachesIn(folder === "." ? "" : folder, text))
  }
  return reachingOver(found)
}

export function entryIn(change: Change): string | null {
  const text = textIn(change, MANIFEST)
  if (text === null) return null
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return null
  }
  if (read === null || typeof read !== "object") return null
  const main = (read as Record<string, unknown>)[MAIN]
  if (typeof main !== "string") return null
  return normalize(join(dirname(MANIFEST), main))
}

function reasonFor(why: string, at: string, from: ReadonlyMap<string, string>): string {
  const held: string[] = []
  let here = at
  for (;;) {
    const said = from.get(here)
    if (said === undefined || held.length >= SHOWN) break
    held.push(said)
    here = said
  }
  if (held.length === 0) return `${why}, and the host loads it as its own entry — ${HOST}`
  const through = held.map((one) => `\`${one}\``).join(", reached from ")
  return `${why}, and the host reaches it from ${through} — ${HOST}`
}

export function refusalsOver(change: Change, paths: readonly string[]): readonly Judged[] {
  const entry = entryIn(change)
  if (entry === null) {
    return [{ path: MANIFEST, reason: `this names no entry, so what the host loads is unknown` }]
  }
  const naming = namingOver(change, paths)
  const from = new Map<string, string>()
  const seen = new Set<string>()
  const said: Judged[] = []
  const stack: string[] = [entry]
  while (stack.length > 0) {
    const here = stack.pop()
    if (here === undefined || seen.has(here)) continue
    seen.add(here)
    const text = textIn(change, here)
    if (text === null) continue
    if (readsGlobal(here, text)) {
      said.push({
        path: here,
        reason: reasonFor(`this reads the \`${GLOBAL}\` global`, here, from),
      })
    }
    for (const one of loadedIn(here, text)) {
      if (one.startsWith(BUN)) {
        said.push({ path: here, reason: reasonFor(`this names \`${one}\``, here, from) })
        continue
      }
      const landed = landingOf(here, one, naming)
      if (landed === null) continue
      const at = normalize(landed)
      if (!from.has(at) && at !== entry) from.set(at, here)
      stack.push(at)
    }
  }
  return said.toSorted((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
