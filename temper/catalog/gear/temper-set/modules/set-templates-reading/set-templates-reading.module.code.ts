import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import type { SetCategoryId } from "akasha/temper/catalog/gear/equipment/modules/set-category-ids/set-category-ids.module.code.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import { temperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import type {
  Effect,
  MetricEffect,
} from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

type Bonus = SetTemplate["bonuses"][number]

export const KEYED_BY: readonly (readonly [string, string])[] = [
  [temperSetCategory.slug, "key"],
  [temperClass.slug, "key"],
  [temperBuffMajor.slug, "key"],
  [temperBuffMinor.slug, "key"],
  [temperBuffOther.slug, "key"],
  [temperMetricTree.slug, "nodeId"],
]

export const SET_FIELDS: readonly string[] = [
  "slug",
  "title",
  "esoSetId",
  "hashPlace",
  "category",
  "classId",
  "valid",
  "bonuses",
  "icons",
]

export type Keys = ReadonlyMap<string, string>

export type PagesOf = (pageTypeSlug: string) => Iterable<Value>

export class Unkeyed extends Error {}

function keyOf(named: unknown, keys: Keys, at: string): string {
  const key = typeof named === "string" ? keys.get(named) : undefined
  if (key === undefined) {
    throw new Unkeyed(`${at} names \`${String(named)}\`, and no page there states a key`)
  }
  return key
}

function listIn(held: unknown): readonly Value[] {
  return Array.isArray(held)
    ? held.filter((one): one is Value => typeof one === "object" && one !== null)
    : []
}

function effectOf(effect: Value, keys: Keys, at: string): Effect {
  if (effect.buffId !== undefined) return { buffId: keyOf(effect.buffId, keys, at) }
  return {
    metricId: keyOf(effect.metricId, keys, at),
    effectType: effect.type,
    effectValue: effect.value,
  } as MetricEffect
}

function bonusOf(bonus: Value, keys: Keys, at: string): Bonus {
  return {
    count: bonus.count as number,
    status: bonus.status as Bonus["status"],
    effects: listIn(bonus.effects).map((effect) => effectOf(effect, keys, at)),
    description: bonus.description as string,
  }
}

function templateOf(value: Value, keys: Keys): SetTemplate {
  const at = `the set page \`${String(value.slug)}\``
  return {
    id: value.slug as string,
    name: value.title as string,
    esoSetId: value.esoSetId as number,
    subcategoryId: keyOf(value.category, keys, at) as SetCategoryId,
    valid: value.valid as SetTemplate["valid"],
    bonuses: listIn(value.bonuses).map((bonus) => bonusOf(bonus, keys, at)),
    icons: Object.fromEntries(listIn(value.icons).map((icon) => [String(icon.slot), icon.icon])),
    ...(value.classId === undefined || value.classId === null
      ? {}
      : { classId: keyOf(value.classId, keys, at) as ClassId }),
  }
}

function placeOf(value: Value): number {
  return typeof value.hashPlace === "number" ? value.hashPlace : Number.POSITIVE_INFINITY
}

function placed(sets: Iterable<Value>): readonly Value[] {
  return [...sets].sort(
    (one, other) =>
      placeOf(one) - placeOf(other) || (String(one.slug) < String(other.slug) ? -1 : 1)
  )
}

export function keysIn(pagesOf: PagesOf): Keys {
  const found = new Map<string, string>()
  for (const [pageTypeSlug, field] of KEYED_BY) {
    for (const value of pagesOf(pageTypeSlug)) {
      const key = value[field]
      if (typeof value.slug === "string" && typeof key === "string") {
        found.set(`${pageTypeSlug}/${value.slug}`, key)
      }
    }
  }
  return found
}

export function setTemplatesOf(sets: Iterable<Value>, keys: Keys): readonly SetTemplate[] {
  return placed(sets).map((value) => templateOf(value, keys))
}
