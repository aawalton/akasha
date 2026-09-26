import { entriesIn } from "akasha/page/modules/entries/page-entries.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { partsReading } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  KEYED_BY,
  type Keys,
  setTemplatesOf,
  Unkeyed,
} from "akasha/temper/catalog/gear/temper-set/modules/set-templates-reading/set-templates-reading.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"

export const SETS_ROWS_AT =
  "temper/player/character/characters-equipment/modules/sets-rows/sets-rows.data-table.code.ts"

const TEMPLATE_TYPE =
  'import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"'

export type SetRowsPage = {
  readonly value: Value
  readonly bonuses: readonly Value[]
  readonly icons: readonly Value[]
}

export const KEYED_PAGE_TYPES: readonly string[] = KEYED_BY.map(([pageTypeSlug]) => pageTypeSlug)

export type PagesOf = (pageTypeSlug: string) => ReadonlyMap<string, Value>

export type BodyAt = (path: string) => string | null

type Written = { readonly body: string } | { readonly refused: string }

export function setsRowsBody(pages: readonly SetRowsPage[], keys: Keys): Written {
  let rows: readonly string[]
  try {
    const carried = pages.map((page) => ({
      ...page.value,
      bonuses: page.bonuses,
      icons: page.icons,
    }))
    rows = setTemplatesOf(carried, keys).map((template) => `  ${JSON.stringify(template)},`)
  } catch (error) {
    if (error instanceof Unkeyed) return { refused: error.message }
    throw error
  }
  const body = [
    TEMPLATE_TYPE,
    "",
    "export const SETS_ROWS: readonly SetTemplate[] = [",
    ...rows,
    "]",
    "",
  ].join("\n")
  return { body }
}

function rowsBeside(
  bodyAt: BodyAt,
  path: string,
  held: unknown,
  property: string
): readonly Value[] {
  if (typeof held !== "string") return []
  const first = besideAt(path, property, held)
  if (first === null || bodyAt(first) === null) {
    throw new Error(
      `'${path}' names its ${property} beside it and no file is there, so what the page carries there is unknown rather than nothing`
    )
  }
  const found: Value[] = []
  for (const [at, text] of partsReading(path, property, held, bodyAt)) {
    const read = entriesIn(at, text)
    if ("refused" in read) throw new Error(read.refused)
    found.push(...read.entries)
  }
  return found
}

export function setRowsPagesIn(pagesOf: PagesOf, bodyAt: BodyAt): readonly SetRowsPage[] {
  const found: SetRowsPage[] = []
  for (const [path, value] of pagesOf(temperSet.slug)) {
    found.push({
      value,
      bonuses: rowsBeside(bodyAt, path, value.bonuses, "bonuses"),
      icons: rowsBeside(bodyAt, path, value.icons, "icons"),
    })
  }
  return found
}
