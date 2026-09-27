import { temperCompanionActivationBuff } from "akasha/temper/catalog/companion/activation-buff/temper-companion-activation-buff.page-type.ts"
import {
  type BuffCategory,
  isBuffCategory,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-category/companion-effect-category.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import { temperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.ts"
import { temperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.ts"
import { temperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.ts"

type Row = Readonly<Record<string, unknown>>

type RowsOf = (pageTypeSlug: string) => readonly Row[]

export const EFFECT_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "description",
  "effectCategory",
  "effects",
]

export const EFFECT_TYPES: readonly string[] = [
  temperBuffMajor.slug,
  temperBuffMinor.slug,
  temperBuffOther.slug,
  temperDebuffMajor.slug,
  temperDebuffMinor.slug,
  temperDebuffOther.slug,
]

export function categoriesFrom(rowsOf: RowsOf): Readonly<Record<string, BuffCategory>> {
  const found: Record<string, BuffCategory> = {}
  for (const slug of [...EFFECT_TYPES, temperCompanionActivationBuff.slug]) {
    for (const row of rowsOf(slug)) {
      if (typeof row.key === "string" && isBuffCategory(row.effectCategory)) {
        found[row.key] = row.effectCategory
      }
    }
  }
  return found
}

function onlyValueOf(effects: unknown): number | undefined {
  if (!Array.isArray(effects) || effects.length !== 1) return undefined
  const [effect] = effects
  if (typeof effect !== "object" || effect === null || !("value" in effect)) return undefined
  return typeof effect.value === "number" ? effect.value : undefined
}

export const EFFECT_CATEGORY_KEYS: readonly string[] = ["slug", "key", "displayOrder"]

export function categoryOrderFrom(rows: readonly Row[]): Readonly<Record<string, number>> {
  const found: Record<string, number> = {}
  for (const row of rows) {
    if (typeof row.key === "string" && typeof row.displayOrder === "number") {
      found[row.key] = row.displayOrder
    }
  }
  return found
}

export function effectValuesFrom(rowsOf: RowsOf): Readonly<Record<string, number>> {
  const found: Record<string, number> = {}
  for (const slug of EFFECT_TYPES) {
    for (const row of rowsOf(slug)) {
      const value = onlyValueOf(row.effects)
      if (typeof row.key === "string" && value !== undefined) found[row.key] = value
    }
  }
  return found
}
