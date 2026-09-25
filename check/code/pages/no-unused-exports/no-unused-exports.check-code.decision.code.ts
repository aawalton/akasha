import { basename, dirname } from "node:path"
import {
  namesToldIn,
  typesNamedWithin,
  typesToldIn,
} from "akasha/check/code/pages/no-unused-exports/modules/export-telling/export-telling.module.code.ts"
import {
  ANYTHING,
  DEFAULT,
  lostIn,
  NONE,
  type Taking,
  takingIn,
} from "akasha/check/code/pages/no-unused-exports/modules/import-losing/import-losing.module.code.ts"
import {
  loadedExportsSparing,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { groupsIn } from "akasha/code/module-property-group/modules/group-writing/group-writing.change-generator.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  type Parted,
  pageNamed,
  pageOf,
  partedIn,
  uncommittedNamed,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { nameFor } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const PUBLISHED = "a value only its own file names is published for nothing"

const REACHED = "a value nothing names is code nothing runs"

const PROVED = "a value only a test names is code only the test runs"

const INTRINSIC = /^[a-z]/

const HELD = "ts"

const ROUTE = "route"

const LUALIB_HELPER = "lualib-helper"

const LUA_EXPORT = "luaExport"

const COMPUTED = "computed-property"

const WORK = "work"

const SERVICE = "service-workstation"

const RUN_SERVICE = "runService"

const CHECK = "check-code"

const PERFORMANCE = "performance"

const MEASURED = "measured"

const MODEL_TEST = "model-test"

const ASKING = "asking"

const KEEPING = "keeping"

const PAGE_TYPE = "page-type"

const RULE = "syntax-rule"

const MARK = "mark"

const SHAPE = "folder-shape"

const HOLDS = "HOLDS"

const CODE = "code"

const WRITES = "bodyIn"

const DRAWN = "component-property-group"

const DRAWS = "Drawing"

const FORMULA = "formula"

const WORKS = "worked"

const SLUG = "slug"

const LOADED_BY = "loadedBy"

const ROOT_ROUTE = "root.tsx"

const APP_LAYOUT = "_app-layout.tsx"

const ROUTED: ReadonlySet<string> = new Set([
  DEFAULT,
  "ErrorBoundary",
  "HydrateFallback",
  "Layout",
  "action",
  "clientAction",
  "clientLoader",
  "handle",
  "headers",
  "links",
  "loader",
  "meta",
  "shouldRevalidate",
])

const ROUTE_TABLE = "routes.ts"

const VITE_CONFIG = "vite.config.ts"

const ROUTER_CONFIG = "react-router.config.ts"

const CONFIGURED: ReadonlySet<string> = new Set([DEFAULT])

const BY_FILE: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  [ROOT_ROUTE, ROUTED],
  [APP_LAYOUT, ROUTED],

  [ROUTE_TABLE, CONFIGURED],
  [VITE_CONFIG, CONFIGURED],
  [ROUTER_CONFIG, CONFIGURED],
])

const MANIFEST = "manifest"

const TYPES = "types"

const EVERY: ReadonlySet<string> = new Set([ANYTHING])

const MODULE = "module"

const REACHED_BY_PATH = "reachedByPath"

const NOTHING: ReadonlySet<string> = new Set()

const PROVING: ReadonlySet<string> = new Set(["test", "test-fixtures"])

const FIXTURE = "test-fixture"

const TEST = "test"

const RUNNER = "change-runner"

function takenFrom(path: string, text: string, target: string): readonly string[] {
  const held = takingIn(path, text).get(target)
  if (held === undefined) return []
  return held.has(ANYTHING) ? [ANYTHING] : [...held]
}

function tagged(up: ts.Node, node: ts.Identifier): boolean | null {
  if (ts.isJsxSelfClosingElement(up) || ts.isJsxOpeningElement(up) || ts.isJsxClosingElement(up)) {
    return up.tagName !== node || !INTRINSIC.test(node.text)
  }
  return null
}

function namesIt(node: ts.Identifier): boolean {
  const up = node.parent
  if (ts.isImportSpecifier(up) || ts.isExportSpecifier(up)) return false
  if (ts.isQualifiedName(up)) return up.right !== node
  if (ts.isJsxAttribute(up)) return up.name !== node
  const tag = tagged(up, node)
  if (tag !== null) return tag
  if (ts.isShorthandPropertyAssignment(up)) return true
  return !("name" in up) || up.name !== node
}

export function namedWithin(path: string, text: string): ReadonlySet<string> {
  const found = new Set<string>()
  const walk = (node: ts.Node): undefined => {
    if (ts.isIdentifier(node) && namesIt(node)) found.add(node.text)
    ts.forEachChild(node, walk)
    return undefined
  }
  walk(parsedAs(path, text))
  return found
}

function reasonFor(one: Unreached): string {
  if (one.proved) return `exports \`${one.name}\`, which only a test names — ${PROVED}`
  if (one.named) return `exports \`${one.name}\`, which no other file names — ${PUBLISHED}`
  return `exports \`${one.name}\`, which nothing names — ${REACHED}`
}

function besideCode(said: Parted, pageType: string): boolean {
  return said.pageType === pageType && said.sections.length > 0
}

function besideProperty(said: Parted, pageType: string, property: string): boolean {
  return said.pageType === pageType && said.sections.length === 1 && said.sections[0] === property
}

function fixedFor(path: string, said: Parted | null): ReadonlySet<string> | null {
  if (said !== null && besideCode(said, ROUTE)) return ROUTED
  return BY_FILE.get(basename(path)) ?? null
}

type Bodied = (at: string) => string | null

function luaNamed(path: string, said: Parted, bodyOf: Bodied): string | null {
  if (said.pageType !== LUALIB_HELPER || said.sections.length === 0) return null
  const text = bodyOf(`${dirname(path)}/${pageOf(said)}.${HELD}`)
  if (text === null) return null
  const held = loadedFrom(text).value
  return held === null ? null : textAt(held, LUA_EXPORT)
}

function reachedBeside(said: Parted): ReadonlySet<string> | null {
  if (besideCode(said, COMPUTED)) return new Set([WORK])

  if (besideCode(said, SERVICE)) return new Set([RUN_SERVICE])
  if (besideCode(said, PERFORMANCE)) return new Set([MEASURED])
  if (besideCode(said, MODEL_TEST)) return new Set([ASKING, KEEPING, exportedAs(said.slug)])

  if (besideCode(said, RULE)) return new Set([MARK])
  if (besideCode(said, SHAPE)) return new Set([HOLDS])
  if (besideCode(said, CHECK)) return new Set([exportedAs(said.slug)])
  if (besideCode(said, MANIFEST)) return new Set([DEFAULT])
  return null
}

function typedBeside(said: Parted): boolean {
  return said.sections.length === 1 && said.sections[0] === TYPES
}

function groupCoded(said: Parted, groups: ReadonlyMap<string, string>): string | null {
  if (said.sections.length !== 2 || said.sections[1] !== CODE) return null
  const group = said.sections[0]
  return group === undefined ? null : (groups.get(group) ?? null)
}

function drawnGroupsIn(index: Answering): readonly string[] {
  const found: string[] = []
  for (const listed of index.everyOfType(DRAWN)) {
    const value = index.pageByPath(listed.path)
    const slug = value === null ? null : textAt(value, SLUG)
    if (slug !== null) found.push(slug)
  }
  return found
}

export function groupsSparing(index: Answering): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of groupsIn(index)) found.set(one.slug, WRITES)
  for (const slug of drawnGroupsIn(index)) found.set(slug, DRAWS)
  found.set(FORMULA, WORKS)
  return found
}

export function loadersSparing(index: Answering): ReadonlySet<string> {
  const found = new Set<string>()
  for (const listed of index.everyOfType(PAGE_TYPE)) {
    const value = index.pageByPath(listed.path)
    if (value === null || textAt(value, LOADED_BY) === null) continue
    const slug = textAt(value, SLUG)
    if (slug !== null) found.add(slug)
  }
  return found
}

function loadedBeside(said: Parted, loaders: ReadonlySet<string>): boolean {
  return loaders.has(said.pageType) && besideProperty(said, said.pageType, CODE)
}

export type Reaching = (slug: string) => ReadonlySet<string>

export function reachedByPathSparing(index: Answering): Reaching {
  const held = new Map<string, ReadonlySet<string>>()
  return (slug) => {
    const found = held.get(slug)
    if (found !== undefined) return found
    const value = index.pageAt(MODULE, slug)
    const told = value === null ? null : textsAt(value, REACHED_BY_PATH)
    const made = told === null ? NOTHING : new Set(told)
    held.set(slug, made)
    return made
  }
}

export function sparedIn(
  path: string,
  pageTypes: ReadonlySet<string>,
  groups: ReadonlyMap<string, string>,
  loaders: ReadonlySet<string>,
  reached: Reaching,
  loadedExports: ReadonlyMap<string, ReadonlySet<string>>,
  bodyOf: Bodied
): ReadonlySet<string> {
  const said = partedIn(path)
  const fixed = fixedFor(path, said)
  if (fixed !== null) return fixed
  if (said === null || !pageTypes.has(said.pageType)) return NOTHING
  if (typedBeside(said)) return EVERY
  if (uncommittedNamed(path)) return new Set([nameFor(`${pageOf(said)}.${HELD}`)])
  const told = loadedExports.get(said.pageType)
  if (told !== undefined && said.sections.length > 0) return told
  const lua = luaNamed(path, said, bodyOf)
  if (lua !== null) return new Set([lua])
  const loaded = loadedBeside(said, loaders) ? exportedAs(said.slug) : null
  const beside = reachedBeside(said)
  if (beside !== null) return loaded === null ? beside : new Set([...beside, loaded])
  if (loaded !== null) return new Set([loaded])
  const coded = groupCoded(said, groups)
  if (coded !== null) return new Set([coded])
  const spared = new Set<string>(reached(said.slug))
  if (pageNamed(path, pageTypes)) spared.add(exportedAs(said.slug))
  return spared
}

export type Unreached = {
  readonly name: string
  readonly named: boolean
  readonly proved: boolean
}

function provesOnly(path: string): boolean {
  const said = partedIn(path)
  if (said === null) return false
  if (said.pageType === FIXTURE) return true
  const last = said.sections[said.sections.length - 1]
  return last !== undefined && PROVING.has(last)
}

function provesAFixture(path: string): boolean {
  const said = partedIn(path)
  if (said === null || said.pageType !== FIXTURE) return false
  return said.sections[said.sections.length - 1] === TEST
}

function runnerCoded(path: string): boolean {
  const said = partedIn(path)
  return said !== null && besideProperty(said, RUNNER, CODE)
}

export function unreachedIn(
  path: string,
  text: string,
  spared: ReadonlySet<string>,
  importers: readonly string[],
  bodyOf: (at: string) => string | null
): readonly Unreached[] {
  if (spared.has(ANYTHING)) return []
  const told = namesToldIn(path, text)
  if (told === null) return []
  const wanted = told.filter((one) => !spared.has(one))
  if (wanted.length === 0) return []
  const proving = provesOnly(path)
  const runner = runnerCoded(path)
  const taken = new Set<string>()
  const proved = new Set<string>()
  let everyProved = false
  for (const importer of importers) {
    if (importer === path) continue
    const body = bodyOf(importer)
    if (body === null) continue
    const only = !runner && (proving ? provesAFixture(importer) : provesOnly(importer))
    for (const name of takenFrom(importer, body, path)) {
      if (name === ANYTHING) {
        if (!only) return []
        everyProved = true
        continue
      }
      const into = only ? proved : taken
      into.add(name)
    }
  }
  const here = namedWithin(path, text)
  const types = typesToldIn(path, text)
  const typedHere = types.size === 0 ? NOTHING : typesNamedWithin(path, text)
  return wanted
    .filter((one) => !taken.has(one))
    .map((one) => ({
      name: one,
      named: types.has(one) ? typedHere.has(one) : here.has(one),
      proved: everyProved || proved.has(one),
    }))
    .filter((one) => !one.proved || !one.named)
}

function lostOnly(
  found: readonly Unreached[],
  lost: ReadonlySet<string> | undefined
): readonly Unreached[] {
  if (lost === undefined || lost.has(ANYTHING)) return found
  return found.filter((one) => lost.has(one.name))
}

export function refusalsIn(
  paths: readonly string[],
  index: Answering,
  read: Bodied,
  lost: Taking = NONE
): readonly Judged[] {
  const pageTypes = index.pageTypesIn()
  const groups = groupsSparing(index)
  const loaders = loadersSparing(index)
  const reached = reachedByPathSparing(index)
  const loadedExports = loadedExportsSparing(index)
  const judged: Judged[] = []
  for (const path of paths) {
    if (!typeScripted(path)) continue
    const text = read(path)
    if (text === null) continue
    const spared = sparedIn(path, pageTypes, groups, loaders, reached, loadedExports, read)
    const found = unreachedIn(path, text, spared, index.importersOf(path), read)
    for (const one of lostOnly(found, lost.get(path))) {
      judged.push({ path, reason: reasonFor(one) })
    }
  }
  return judged
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const lost = lostIn(change)
  const paths = [...change.changed, ...lost.keys()]
  return refusalsIn(paths, shadow.index, (at) => textIn(change, at), lost)
}
