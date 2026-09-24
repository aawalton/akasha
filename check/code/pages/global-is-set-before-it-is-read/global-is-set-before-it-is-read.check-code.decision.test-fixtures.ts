import {
  refusalsIn,
  refusalsOver,
} from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.decision.code.ts"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  bodiesOver,
  graphed,
  change as staged,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const ADDON = "temper-addon"

const MODULE = "module"

const DECLARATION = "type-declaration"

const ONE = "one"

const IDS = "one-ids"

const ADDON_ID = "01a0c5ef-0000-7000-8000-000000000001"

const IDS_ID = "01a0c5ef-0000-7000-8000-000000000002"

const MODULE_IDS_FROM = "01a0c5ef-0000-7000-8000-0000000001"

const TWO_DIGITS = 2

const PAD = "0"

export const scratch = scratchWorld()

const FOLDER = "akasha/pages/one"

export const ADDON_AT = `${FOLDER}/${ONE}.${ADDON}.ts`

const IDS_AT = `${FOLDER}/${IDS}/${IDS}.${DECLARATION}.d.ts`

const IDS_PAGE_AT = `${FOLDER}/${IDS}/${IDS}.${DECLARATION}.ts`

function moduleAt(slug: string): string {
  return `${FOLDER}/modules/${slug}/${slug}.${MODULE}.code.ts`
}

function pageAt(slug: string): string {
  return `${FOLDER}/modules/${slug}/${slug}.${MODULE}.ts`
}

export const SETTING_AT = moduleAt("setting")

export const OTHER_AT = moduleAt("other")

export const MIDDLE_AT = moduleAt("middle")

export const READING_AT = moduleAt("reading")

export const MAIN_AT = moduleAt("main")

export const OUTSIDE_AT = "akasha/shared/outside/outside.module.code.ts"

const DECLARES = `declare const ONE_ARENA: number
declare const ONE_DUNGEON: number
declare const ONE_LOOSE: number
declare const ONE_ROW: number
declare const ONE_TABLE: number
declare function OneShow(this: void): void
`

export const SETTING = `const G = asGlobalTable(globalThis)

const POSSIBLE_TYPES: { [index: number]: string } = {
  [1]: "ONE_ARENA",
  [2]: "ONE_DUNGEON",
}

for (const [typeId, typeName] of ipairs(POSSIBLE_TYPES)) {
  G[typeName] = typeId
}
`

export const READING = `export const TYPE_TO_TEXTURE: { [key: string]: string } = {
  [ONE_ARENA]: "arena.dds",
  [ONE_DUNGEON]: "dungeon.dds",
}
`

export const IMPORTS_SETTING = 'import "../setting/setting.module.code.ts"\n'

export const IMPORTS_MIDDLE = 'import "../middle/middle.module.code.ts"\n'

export const IMPORTS_OTHER = 'import "../other/other.module.code.ts"\n'

export const MAIN = `${IMPORTS_SETTING}import "../reading/reading.module.code.ts"\n`

export const READS_LOOSE = "export const loose = ONE_LOOSE\n"

export const SETS_ROWS = `const lib = { rows: { ONE_ROW: 1 } }

for (const [key, value] of pairs(lib.rows)) {
  _G[key] = value
}
`

export const READS_ROW = "export const row = ONE_ROW\n"

export const READS_IN_A_FUNCTION = `export function textureOf(): string {
  return ONE_ARENA === 1 ? "arena.dds" : "dungeon.dds"
}
`

export const SETS_IN_A_FUNCTION = `export function showOf(this: void): undefined {
  OneShow = function (this: void): void {}
}
`

export const SHOWS = "OneShow = function (this: void): void {}\n"

export const READS_SHOW = "OneShow()\n"

export const SETS_TABLE_BY_LITERAL = '_G["ONE_TABLE"] = 1\n'

export const SETS_TABLE_BY_NAME = "globalThis.ONE_TABLE = 2\n"

export const READS_TABLE = "export const table = ONE_TABLE\n"

function slugsIn(bodies: Readonly<Record<string, string>>): readonly string[] {
  const found: string[] = []
  for (const path of Object.keys(bodies)) {
    const said = partedIn(path)
    if (said !== null && said.pageType === MODULE) found.push(said.slug)
  }
  return found
}

function rooted(bodies: Readonly<Record<string, string>>, entry = "main"): string {
  const root = scratch.rootFor("akasha-global-set-")
  nothingFiled(root)
  graphed(root)
  const slugs = slugsIn(bodies)
  const parts = [`${DECLARATION}/${IDS}`, ...slugs.map((one) => `${MODULE}/${one}`)]
  const bundleEntry = `${MODULE}/${entry}`
  const value = { id: ADDON_ID, type: `${pageType.slug}/${ADDON}`, slug: ONE, parts, bundleEntry }
  valueAlsoFiled(root, ADDON, [{ path: ADDON_AT, value }])
  listedFiled(root, DECLARATION, IDS, [{ path: IDS_PAGE_AT, id: IDS_ID }])
  writing(root, IDS_AT, DECLARES)
  slugs.forEach((slug, at) => {
    const id = `${MODULE_IDS_FROM}${String(at).padStart(TWO_DIGITS, PAD)}`
    listedFiled(root, MODULE, slug, [{ path: pageAt(slug), id }])
  })
  for (const [path, body] of Object.entries(bodies)) writing(root, path, body)
  return root
}

export function world(bodies: Readonly<Record<string, string>>): Change {
  return bodiesOver(rooted(bodies), bodies)
}

export function refused(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  const held = world(bodies)
  const shadow = shadowAt(held.root)
  return refusalsOver(shadow.listed(), shadow, (path) => textIn(held, path))
}

export function pathsRefused(bodies: Readonly<Record<string, string>>): readonly string[] {
  return refused(bodies).map((one) => one.path)
}

export function refusedIn(
  bodies: Readonly<Record<string, string>>,
  changed: readonly string[]
): readonly Judged[] {
  const held = world(bodies)
  return refusalsIn({ ...held, changed: [...changed] }, shadowAt(held.root))
}

export function patched(
  bodies: Readonly<Record<string, string>>,
  after: Readonly<Record<string, string | null>>
): Change {
  return staged(rooted(bodies), after, bodies)
}

export function tracked(bodies: Readonly<Record<string, string>>): string {
  const root = rooted(bodies)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  const added = ran(["git", "-C", root, "add", "-A"])
  if (added.code !== 0) throw new Error(`nothing was tracked at ${root} — ${added.err.trim()}`)
  return root
}
