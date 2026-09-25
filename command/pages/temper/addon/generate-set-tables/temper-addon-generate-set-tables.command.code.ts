import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Taking,
} from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperAddonGenerateSetTables as page } from "akasha/command/pages/temper/addon/generate-set-tables/temper-addon-generate-set-tables.command.ts"
import {
  readingIn,
  valuesByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import {
  keysIn,
  SETS_ROWS_AT,
  setRowsPagesIn,
  setsRowsBody,
} from "akasha/temper/catalog/gear/temper-set/modules/set-rows-writing/set-rows-writing.module.code.ts"
import {
  ITEM_ROWS_AT,
  itemRowsBody,
  SET_DATA_AT,
  SET_INFO_AT,
  setDataBody,
  setInfoBody,
  setPagesOf,
} from "akasha/temper/catalog/gear/temper-set/modules/set-tables-writing/set-tables-writing.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import { temperPublicDungeon } from "akasha/temper/catalog/world/temper-public-dungeon/temper-public-dungeon.page-type.ts"

const NAMED = [codeRootArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MESSAGE =
  "Write the set tables of the sets addon, the item browser and character builds from the set pages"

type Taken = Taking<typeof page, typeof NAMED>

function classIdsIn(root: string): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const value of valuesByPath(root, temperClass.slug).values()) {
    const esoClassId = parseNumber(value.esoClassId)
    if (typeof value.slug === "string" && esoClassId !== undefined) {
      found.set(`${temperClass.slug}/${value.slug}`, esoClassId)
    }
  }
  return found
}

function publicDungeonsIn(root: string): readonly number[] {
  return [...valuesByPath(root, temperPublicDungeon.slug).values()]
    .map((value) => parseNumber(value.esoZoneId))
    .filter((one): one is number => one !== undefined)
}

async function heldAt(root: string, at: string): Promise<string | null> {
  try {
    return await readFile(join(root, at), "utf8")
  } catch {
    return null
  }
}

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }
  const sets = setPagesOf(valuesByPath(root, temperSet.slug))
  if (sets.length === 0) return refused("no set page was found, so no table was written", DATA)
  let rows: ReturnType<typeof setsRowsBody>
  try {
    const reading = readingIn(root)
    const pagesOf = (pageTypeSlug: string) => valuesByPath(reading, pageTypeSlug)
    rows = setsRowsBody(setRowsPagesIn(pagesOf, reading.read), keysIn(pagesOf))
  } catch (error) {
    rows = { refused: error instanceof Error ? error.message : String(error) }
  }
  if ("refused" in rows) return refused(`no table was written — ${rows.refused}`, DATA)
  const bodies: readonly (readonly [string, string])[] = [
    [SET_INFO_AT, setInfoBody(sets, classIdsIn(root))],
    [SET_DATA_AT, setDataBody(sets, publicDungeonsIn(root))],
    [ITEM_ROWS_AT, itemRowsBody(sets)],
    [SETS_ROWS_AT, rows.body],
  ]
  const asked: Asking[] = []
  for (const [at, body] of bodies) {
    if ((await heldAt(root, at)) !== body) asked.push({ at: PUT, given: { at, body } })
  }
  if (asked.length === 0) return told(["every table already holds what the set pages say"])
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the tables were not written — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return told(["every table already holds what the set pages say, once formatted"])
  }
  return told([
    `${String(landed.landed.length)} file(s) landed`,
    `written from ${String(sets.length)} set page(s)`,
  ])
}

export function temperAddonGenerateSetTables(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
