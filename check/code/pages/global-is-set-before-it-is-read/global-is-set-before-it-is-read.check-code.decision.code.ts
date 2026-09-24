import { dirname } from "node:path"
import { unboundIn } from "akasha/change/modules/load-order/load-order.module.code.ts"
import { thereIn } from "akasha/change/modules/name-binding/name-binding.module.code.ts"
import { statedIn } from "akasha/check/code/pages/global-declared-once/global-declared-once.check-code.decision.code.ts"
import { askedOf } from "akasha/check/code/pages/no-import-cycle/no-import-cycle.check-code.decision.code.ts"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  holdingOver,
  textIn,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { module as modulePage } from "akasha/code/module/module.page-type.ts"
import {
  literalIn,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { typeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.ts"
import {
  type Asked,
  reachedFrom,
  takenIn,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { atLoadImports } from "akasha/graph/predicate/pages/at-load-imports/at-load-imports.graph-predicate.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  slugOf,
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperAddon } from "akasha/temper/addon/temper-addon.page-type.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"
import ts from "typescript"

const CODE = "code"

const AMBIENT = "d"

const TS = "ts"

const PARTS = "parts"

const BUNDLE_ENTRY = "bundleEntry"

const VALUE = "value"

const VARIABLE = "variable"

const FUNCTION = "function"

const GLOBAL_THIS = "globalThis"

const LUA_GLOBALS = "_G"

const VALUE_AT = 1

const SHOWN = 3

const APART = "\n"

const SET_FIRST =
  "a module reading an add-on's own global as it loads reaches the module setting that global"

export type Addon = {
  readonly page: string
  readonly folder: string
  readonly entry: string | null
  readonly declared: ReadonlySet<string>
  readonly modules: readonly string[]
}

export type Module = {
  readonly path: string
  readonly reads: readonly string[]
  readonly sets: readonly string[]
}

type Unreached = {
  readonly path: string
  readonly name: string
  readonly setters: readonly string[]
}

export type Bodies = (path: string) => string | null

type Tables = ReadonlyMap<string, readonly string[]>

function codeBeside(
  paged: Paged,
  pageTypeSlug: string,
  named: string,
  held: string
): string | null {
  const page = paged.index.listedAt(pageTypeSlug, slugOf(named))[0]
  return page === undefined ? null : besideAt(page.path, held, TS)
}

function declaredIn(paged: Paged, parts: readonly string[], bodyAt: Bodies): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of parts) {
    if (!one.startsWith(`${typeDeclaration.slug}/`)) continue
    const at = codeBeside(paged, typeDeclaration.slug, one, AMBIENT)
    const text = at === null ? null : bodyAt(at)
    if (at === null || text === null) continue
    for (const stated of statedIn(at, text)) {
      if (stated.space !== VALUE) continue
      if (stated.kind === VARIABLE || stated.kind === FUNCTION) found.add(stated.name)
    }
  }
  return found
}

function moduleCoded(path: string): boolean {
  const said = partedIn(path)
  if (said === null || said.pageType !== modulePage.slug || said.held !== TS) return false
  return said.sections.length === 1 && said.sections[0] === CODE
}

export function addonsIn(
  paged: Paged,
  listed: readonly string[],
  bodyAt: Bodies
): readonly Addon[] {
  const found = new Map<string, Addon>()
  for (const one of paged.index.everyOfType(temperAddon.slug)) {
    if (found.has(one.path)) continue
    const value = paged.pageOf(one.path)
    if (value === null) continue
    const folder = dirname(one.path)
    const under = `${folder}/`
    const entry = textAt(value, BUNDLE_ENTRY)
    found.set(one.path, {
      page: one.path,
      folder,
      entry: entry === null ? null : codeBeside(paged, modulePage.slug, entry, CODE),
      declared: declaredIn(paged, textsAt(value, PARTS) ?? [], bodyAt),
      modules: listed.filter((path) => path.startsWith(under) && moduleCoded(path)),
    })
  }
  return [...found.values()]
}

function bare(node: ts.Expression): ts.Expression {
  if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) {
    return bare(node.expression)
  }
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return bare(node.expression)
  return node
}

function tableNamed(node: ts.Expression, aliases: ReadonlySet<string>): boolean {
  const held = bare(node)
  if (ts.isIdentifier(held)) {
    return held.text === GLOBAL_THIS || held.text === LUA_GLOBALS || aliases.has(held.text)
  }
  if (!ts.isCallExpression(held) || held.arguments.length !== 1) return false
  const only = held.arguments[0]
  return only !== undefined && tableNamed(only, aliases)
}

function literalsIn(node: ts.Expression): readonly string[] | null {
  const held = bare(node)
  const found: string[] = []
  if (ts.isObjectLiteralExpression(held)) {
    for (const one of held.properties) {
      const said = ts.isPropertyAssignment(one) ? literalIn(one.initializer) : null
      if (said === null) return null
      found.push(said)
    }
    return found
  }
  if (!ts.isArrayLiteralExpression(held)) return null
  for (const one of held.elements) {
    const said = literalIn(one)
    if (said === null) return null
    found.push(said)
  }
  return found
}

function namedAtTop(
  source: ts.SourceFile,
  kept: (name: string, initializer: ts.Expression) => undefined
): undefined {
  for (const one of source.statements) {
    if (!ts.isVariableStatement(one)) continue
    for (const held of one.declarationList.declarations) {
      if (!ts.isIdentifier(held.name) || held.initializer === undefined) continue
      kept(held.name.text, held.initializer)
    }
  }
}

function aliasesIn(source: ts.SourceFile): ReadonlySet<string> {
  const found = new Set<string>()
  namedAtTop(source, (name, initializer) => {
    if (tableNamed(initializer, found)) found.add(name)
  })
  return found
}

function tablesIn(source: ts.SourceFile): Tables {
  const found = new Map<string, readonly string[]>()
  namedAtTop(source, (name, initializer) => {
    const literals = literalsIn(initializer)
    if (literals !== null) found.set(name, literals)
  })
  return found
}

function iteratedIn(loop: ts.ForOfStatement): string | null {
  const over = bare(loop.expression)
  if (ts.isIdentifier(over)) return over.text
  if (!ts.isCallExpression(over) || over.arguments.length !== 1) return null
  const only = over.arguments[0]
  return only !== undefined && ts.isIdentifier(only) ? only.text : null
}

function valueBoundIn(loop: ts.ForOfStatement, name: string): boolean {
  const opened = loop.initializer
  if (!ts.isVariableDeclarationList(opened) || opened.declarations.length !== 1) return false
  const one = opened.declarations[0]
  if (one === undefined) return false
  if (ts.isIdentifier(one.name)) return one.name.text === name
  if (!ts.isArrayBindingPattern(one.name)) return false
  const value = one.name.elements[VALUE_AT]
  if (value === undefined || ts.isOmittedExpression(value)) return false
  return ts.isIdentifier(value.name) && value.name.text === name
}

function namesKeyedBy(key: ts.Identifier, tables: Tables): readonly string[] {
  for (let up = key.parent; up !== undefined && !ts.isSourceFile(up); up = up.parent) {
    if (!ts.isForOfStatement(up) || !valueBoundIn(up, key.text)) continue
    const table = iteratedIn(up)
    return table === null ? [] : (tables.get(table) ?? [])
  }
  return []
}

function namedBy(
  left: ts.Expression,
  aliases: ReadonlySet<string>,
  tables: Tables,
  there: ReadonlySet<string>
): readonly string[] {
  if (ts.isIdentifier(left)) return there.has(left.text) ? [] : [left.text]
  if (ts.isPropertyAccessExpression(left)) {
    return tableNamed(left.expression, aliases) ? [left.name.text] : []
  }
  if (!ts.isElementAccessExpression(left) || !tableNamed(left.expression, aliases)) return []
  const key = left.argumentExpression
  const literal = literalIn(key)
  if (literal !== null) return [literal]
  return ts.isIdentifier(key) ? namesKeyedBy(key, tables) : []
}

function setsIn(
  source: ts.SourceFile,
  declared: ReadonlySet<string>,
  there: ReadonlySet<string>
): readonly string[] {
  const aliases = aliasesIn(source)
  const tables = tablesIn(source)
  const found: string[] = []
  const walked = (each: ts.Node): undefined => {
    if (ts.isFunctionLike(each) || ts.isClassLike(each)) return undefined
    if (ts.isBinaryExpression(each) && each.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      for (const name of namedBy(each.left, aliases, tables, there)) {
        if (declared.has(name) && !found.includes(name)) found.push(name)
      }
    }
    return ts.forEachChild(each, walked)
  }
  ts.forEachChild(source, walked)
  return found
}

function readsIn(
  source: ts.SourceFile,
  declared: ReadonlySet<string>,
  there: ReadonlySet<string>
): readonly string[] {
  const found: string[] = []
  for (const one of source.statements) {
    for (const name of unboundIn(source, one, there)) {
      if (declared.has(name) && !found.includes(name)) found.push(name)
    }
  }
  return found
}

function spellingOf(declared: ReadonlySet<string>): RegExp {
  const names = [...declared].map((one) => one.replace(/\$/g, "\\$"))
  return new RegExp(`\\b(?:${names.join("|")})\\b`)
}

export function modulesOf(addon: Addon, bodyAt: Bodies): readonly Module[] {
  if (addon.declared.size === 0) return []
  const spelt = spellingOf(addon.declared)
  const found: Module[] = []
  for (const path of addon.modules) {
    const text = bodyAt(path)
    if (text === null || !spelt.test(text)) continue
    const source = parsedAs(path, text)
    const there = thereIn(source)
    found.push({
      path,
      reads: readsIn(source, addon.declared, there),
      sets: setsIn(source, addon.declared, there),
    })
  }
  return found
}

function settersOf(modules: readonly Module[]): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of modules) {
    for (const name of one.sets) {
      const held = found.get(name)
      if (held === undefined) found.set(name, [one.path])
      else held.push(one.path)
    }
  }
  return found
}

function every(): boolean {
  return true
}

function unreachedIn(
  addon: Addon,
  modules: readonly Module[],
  asked: Asked,
  judged: (path: string) => boolean = every
): readonly Unreached[] {
  const setters = settersOf(modules)
  const readers = modules.filter(
    (one) => judged(one.path) && one.reads.some((name) => setters.has(name))
  )
  if (readers.length === 0) return []
  const seeds = [...(addon.entry === null ? [] : [addon.entry]), ...addon.modules]
  const taken = takenIn(atLoadImports, seeds, asked)
  const found: Unreached[] = []
  for (const one of readers) {
    const reached = reachedFrom(taken, one.path)
    for (const name of one.reads) {
      const held = setters.get(name)
      if (held === undefined || held.some((path) => reached.has(path))) continue
      found.push({ path: one.path, name, setters: held })
    }
  }
  return found
}

function reasonFor(path: string, names: readonly string[], setters: readonly string[]): string {
  const reader = partedIn(path)?.slug ?? path
  const shown = namesDrawn(names.slice(0, SHOWN))
  const rest = names.length > SHOWN ? ` and ${names.length - SHOWN} more` : ""
  const by = namesDrawn(
    setters.map((one) => partedIn(one)?.slug ?? one),
    " or "
  )
  const which = setters.length > 1 ? "either" : "it"
  return `\`${reader}\` reads ${shown}${rest}, which ${by} sets, and does not reach ${which} as it loads — ${SET_FIRST}`
}

function judgedOf(found: readonly Unreached[]): readonly Judged[] {
  const grouped = new Map<string, { readonly one: Unreached; readonly names: string[] }>()
  for (const one of found) {
    const key = [one.path, ...one.setters].join(APART)
    const held = grouped.get(key)
    if (held === undefined) grouped.set(key, { one, names: [one.name] })
    else held.names.push(one.name)
  }
  return [...grouped.values()]
    .map(({ one, names }) => ({ path: one.path, reason: reasonFor(one.path, names, one.setters) }))
    .sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}

type Reading = {
  readonly asked: Asked
  readonly bodyAt: Bodies
}

function readingOf(change: Change, shadow: Shadow): Reading {
  const held = holdingOver(change)
  const bodyAt: Bodies = (path) => textIn(held, path)
  const through = (path: string): boolean => textNamed(path) && held.after(path) !== null
  return { asked: { index: shadow.index, bodyAt, through }, bodyAt }
}

export function refusalsOver(
  paths: readonly string[],
  paged: Paged,
  bodyAt: Bodies
): readonly Judged[] {
  const asked = askedOf(paged, bodyAt)
  const found: Unreached[] = []
  for (const addon of addonsIn(paged, paths, bodyAt)) {
    found.push(...unreachedIn(addon, modulesOf(addon, bodyAt), asked))
  }
  return judgedOf(found)
}

export function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = new Set(change.changed)
  const { asked, bodyAt } = readingOf(change, shadow)
  const found: Unreached[] = []
  for (const addon of addonsIn(shadow, shadow.listed(), bodyAt)) {
    const under = `${addon.folder}/`
    if (!change.changed.some((one) => one.startsWith(under))) continue
    const modules = modulesOf(addon, bodyAt)
    found.push(...unreachedIn(addon, modules, asked, (path) => carried.has(path)))
  }
  return judgedOf(found)
}
