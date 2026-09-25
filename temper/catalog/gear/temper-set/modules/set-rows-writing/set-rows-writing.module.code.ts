import { valuesByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { entriesAt } from "akasha/page/modules/entries/page-entries.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { temperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

export const SETS_ROWS_AT =
  "temper/player/character/characters-equipment/modules/sets-rows/sets-rows.data-table.code.ts"

const TEMPLATE_TYPE =
  'import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"'

const KEYED_BY: readonly (readonly [string, string])[] = [
  [temperSetCategory.slug, "key"],
  [temperClass.slug, "key"],
  [temperBuffMajor.slug, "key"],
  [temperBuffMinor.slug, "key"],
  [temperBuffOther.slug, "key"],
  [temperMetricTree.slug, "nodeId"],
]

export type SetRowsPage = {
  readonly value: Value
  readonly bonuses: readonly Value[]
  readonly icons: readonly Value[]
}

export type Keys = ReadonlyMap<string, string>

export type Written = { readonly body: string } | { readonly refused: string }

class Unkeyed extends Error {}

function keyOf(named: unknown, keys: Keys, at: string): string {
  const key = typeof named === "string" ? keys.get(named) : undefined
  if (key === undefined) {
    throw new Unkeyed(`${at} names \`${String(named)}\`, and no page there states a key`)
  }
  return key
}

function listIn(held: unknown): readonly Value[] {
  return Array.isArray(held) ? held.filter((one): one is Value => typeof one === "object") : []
}

function effectOf(effect: Value, keys: Keys, at: string): Value {
  if (effect.buffId !== undefined) return { buffId: keyOf(effect.buffId, keys, at) }
  return {
    metricId: keyOf(effect.metricId, keys, at),
    effectType: effect.type,
    effectValue: effect.value,
  }
}

function bonusOf(bonus: Value, keys: Keys, at: string): Value {
  return {
    count: bonus.count,
    status: bonus.status,
    effects: listIn(bonus.effects).map((effect) => effectOf(effect, keys, at)),
    description: bonus.description,
  }
}

function rowOf(page: SetRowsPage, keys: Keys): Value {
  const value = page.value
  const at = `the set page \`${String(value.slug)}\``
  const row: Value = {
    id: value.slug,
    name: value.title,
    esoSetId: value.esoSetId,
    subcategoryId: keyOf(value.category, keys, at),
    valid: value.valid,
    bonuses: page.bonuses.map((bonus) => bonusOf(bonus, keys, at)),
    icons: Object.fromEntries(page.icons.map((icon) => [String(icon.slot), icon.icon])),
  }
  if (value.classId !== undefined) row.classId = keyOf(value.classId, keys, at)
  return row
}

function placeOf(page: SetRowsPage): number {
  return typeof page.value.hashPlace === "number" ? page.value.hashPlace : Number.POSITIVE_INFINITY
}

function slugOf(page: SetRowsPage): string {
  return String(page.value.slug)
}

function placed(pages: readonly SetRowsPage[]): readonly SetRowsPage[] {
  return [...pages].sort(
    (one, other) => placeOf(one) - placeOf(other) || (slugOf(one) < slugOf(other) ? -1 : 1)
  )
}

export function setsRowsBody(pages: readonly SetRowsPage[], keys: Keys): Written {
  let rows: readonly string[]
  try {
    rows = placed(pages).map((page) => `  ${JSON.stringify(rowOf(page, keys))},`)
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

export function keysIn(root: string): Keys {
  const found = new Map<string, string>()
  for (const [pageTypeSlug, field] of KEYED_BY) {
    for (const value of valuesByPath(root, pageTypeSlug).values()) {
      const key = value[field]
      if (typeof value.slug === "string" && typeof key === "string") {
        found.set(`${pageTypeSlug}/${value.slug}`, key)
      }
    }
  }
  return found
}

function rowsBeside(root: string, path: string, held: unknown, property: string): readonly Value[] {
  if (typeof held !== "string") return []
  const read = entriesAt(root, path, property, held)
  if ("refused" in read) throw new Error(read.refused)
  return read.entries
}

export function setRowsPagesIn(root: string): readonly SetRowsPage[] {
  const found: SetRowsPage[] = []
  for (const [path, value] of valuesByPath(root, temperSet.slug)) {
    found.push({
      value,
      bonuses: rowsBeside(root, path, value.bonuses, "bonuses"),
      icons: rowsBeside(root, path, value.icons, "icons"),
    })
  }
  return found
}
