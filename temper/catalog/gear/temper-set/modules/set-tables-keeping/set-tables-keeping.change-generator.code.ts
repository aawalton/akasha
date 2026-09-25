import type { Adding, Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textIn, textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { type Shadow, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type BodyAt,
  KEYED_PAGE_TYPES,
  keysIn,
  type PagesOf,
  SETS_ROWS_AT,
  setRowsPagesIn,
  setsRowsBody,
} from "akasha/temper/catalog/gear/temper-set/modules/set-rows-writing/set-rows-writing.module.code.ts"
import {
  ITEM_ROWS_AT,
  itemRowsBody,
  placeKindsOf,
  SET_DATA_AT,
  SET_INFO_AT,
  setDataBody,
  setInfoBody,
  setPagesOf,
} from "akasha/temper/catalog/gear/temper-set/modules/set-tables-writing/set-tables-writing.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import { temperPublicDungeon } from "akasha/temper/catalog/world/temper-public-dungeon/temper-public-dungeon.page-type.ts"
import { temperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.ts"

export const TABLES_AT: readonly string[] = [SET_INFO_AT, SET_DATA_AT, ITEM_ROWS_AT, SETS_ROWS_AT]

const READ_FROM: ReadonlySet<string> = new Set([
  temperSet.slug,
  temperClass.slug,
  temperPublicDungeon.slug,
  temperWorldZone.slug,
  ...KEYED_PAGE_TYPES,
])

const BYTES = new TextEncoder()

export type Reader = {
  readonly pagesOf: PagesOf
  readonly bodyAt: BodyAt
}

type Tables =
  | { readonly tables: readonly (readonly [string, string])[]; readonly sets: number }
  | { readonly refused: string }

type Formatting = (at: string, body: string) => string

type Written = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
  readonly refused?: readonly string[]
}

const NOTHING: Written = { edits: [], said: [] }

function classIdsIn(pagesOf: PagesOf): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const value of pagesOf(temperClass.slug).values()) {
    const esoClassId = parseNumber(value.esoClassId)
    if (typeof value.slug === "string" && esoClassId !== undefined) {
      found.set(`${temperClass.slug}/${value.slug}`, esoClassId)
    }
  }
  return found
}

function publicDungeonsIn(pagesOf: PagesOf): readonly number[] {
  return [...pagesOf(temperPublicDungeon.slug).values()]
    .map((value) => parseNumber(value.esoZoneId))
    .filter((one): one is number => one !== undefined)
}

export function setTablesOver(reader: Reader): Tables {
  const sets = setPagesOf(reader.pagesOf(temperSet.slug))
  if (sets.length === 0) return { refused: "no set page was found" }
  let rows: ReturnType<typeof setsRowsBody>
  try {
    rows = setsRowsBody(setRowsPagesIn(reader.pagesOf, reader.bodyAt), keysIn(reader.pagesOf))
  } catch (thrown) {
    rows = { refused: saidBy(thrown) }
  }
  if ("refused" in rows) return rows
  return {
    tables: [
      [SET_INFO_AT, setInfoBody(sets, classIdsIn(reader.pagesOf))],
      [
        SET_DATA_AT,
        setDataBody(
          sets,
          publicDungeonsIn(reader.pagesOf),
          placeKindsOf(reader.pagesOf(temperWorldZone.slug).values())
        ),
      ],
      [ITEM_ROWS_AT, itemRowsBody(sets)],
      [SETS_ROWS_AT, rows.body],
    ],
    sets: sets.length,
  }
}

function turning(path: string): boolean {
  if (TABLES_AT.includes(path)) return true
  const said = partedIn(path)
  return said !== null && READ_FROM.has(said.pageType)
}

export function couldTurn(change: Change): boolean {
  return change.changed.some(turning)
}

export function writtenOver(change: Change, reader: Reader, formatting: Formatting): Written {
  const made = setTablesOver(reader)
  if ("refused" in made) {
    return {
      edits: [],
      said: [],
      refused: [`the set tables cannot be written again from the set pages — ${made.refused}`],
    }
  }
  const edits: (Adding | Replacing)[] = []
  for (const [at, body] of made.tables) {
    const was = textOf(change.after(at))
    if (was === body) continue
    const written = formatting(at, body)
    if (was === written) continue
    edits.push(
      was === null
        ? { kind: "add", path: at, content: written }
        : { kind: "replace", path: at, contentFrom: was, contentTo: written }
    )
  }
  if (edits.length === 0) return NOTHING
  const named = edits.map((one) => `\`${one.path}\``).join(", ")
  return { edits, said: [`${named} written again from the set pages`] }
}

function readerOver(change: Change, shadow: Shadow): Reader {
  const held = new Map<string, ReadonlyMap<string, Value>>()
  return {
    pagesOf: (pageTypeSlug) => {
      const found = held.get(pageTypeSlug)
      if (found !== undefined) return found
      const made = new Map<string, Value>()
      for (const one of shadow.index.everyOfType(pageTypeSlug)) {
        const value = shadow.pageOf(one.path)
        if (value !== null) made.set(one.path, value)
      }
      held.set(pageTypeSlug, made)
      return made
    },
    bodyAt: (at) => textOf(change.after(at)),
  }
}

export function generateChange(change: Change): Written {
  if (!couldTurn(change)) return NOTHING
  const cast = shadowFor(change)
  if ("refused" in cast) return NOTHING
  return writtenOver(change, readerOver(change, cast.shadow), formattingIn(change.root))
}

function formattingIn(root: string): Formatting {
  return (at, body) => textIn(formattedBody(root, at, BYTES.encode(body)).body)
}
