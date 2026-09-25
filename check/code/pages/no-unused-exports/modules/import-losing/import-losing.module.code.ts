import { loadingIn } from "akasha/check/code/pages/no-unused-exports/modules/specifier-placing/specifier-placing.module.code.ts"
import { textIn, textWas } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { landingOf } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import ts from "typescript"

export const ANYTHING = "*"

export const DEFAULT = "default"

const WHOLE = "import("

export type Taking = ReadonlyMap<string, ReadonlySet<string>>

export const NONE: Taking = new Map()

function spelledBy(node: ts.Node): string | null {
  if (!ts.isImportTypeNode(node)) return null
  const said = node.argument
  if (ts.isLiteralTypeNode(said) && ts.isStringLiteral(said.literal)) return said.literal.text
  return null
}

function takenInto(
  found: Map<string, Set<string>>,
  target: string | null,
  name: string
): undefined {
  if (target === null) return undefined
  const held = found.get(target)
  if (held === undefined) found.set(target, new Set([name]))
  else held.add(name)
  return undefined
}

function wholeInto(
  found: Map<string, Set<string>>,
  path: string,
  source: ts.SourceFile
): undefined {
  for (const spelled of loadingIn(source)) takenInto(found, landingOf(path, spelled), ANYTHING)
  const walk = (node: ts.Node): undefined => {
    const spelled = spelledBy(node)
    if (spelled !== null) takenInto(found, landingOf(path, spelled), ANYTHING)
    ts.forEachChild(node, walk)
    return undefined
  }
  walk(source)
  return undefined
}

export function takingIn(path: string, text: string): Taking {
  const source = parsedAs(path, text)
  const found = new Map<string, Set<string>>()
  if (text.includes(WHOLE)) wholeInto(found, path, source)
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const named = statement.moduleSpecifier
    if (!ts.isStringLiteral(named)) continue
    const target = landingOf(path, named.text)
    if (statement.importClause?.name !== undefined) takenInto(found, target, DEFAULT)
    const bound = statement.importClause?.namedBindings
    if (bound !== undefined && ts.isNamespaceImport(bound)) takenInto(found, target, ANYTHING)
    if (bound === undefined || !ts.isNamedImports(bound)) continue
    for (const each of bound.elements) {
      takenInto(found, target, (each.propertyName ?? each.name).text)
    }
  }
  return found
}

function lostTo(
  had: ReadonlySet<string>,
  kept: ReadonlySet<string> | undefined
): readonly string[] {
  if (kept?.has(ANYTHING) === true) return []
  if (had.has(ANYTHING)) return [ANYTHING]
  return [...had].filter((one) => kept?.has(one) !== true)
}

export function lostIn(change: Change): Taking {
  const carried = new Set(change.changed)
  const lost = new Map<string, Set<string>>()
  for (const path of change.changed) {
    if (!typeScripted(path)) continue
    const was = textWas(change, path)
    if (was === null) continue
    const now = textIn(change, path)
    const has = now === null ? NONE : takingIn(path, now)
    for (const [target, had] of takingIn(path, was)) {
      if (carried.has(target) || !typeScripted(target)) continue
      for (const name of lostTo(had, has.get(target))) takenInto(lost, target, name)
    }
  }
  return lost
}
