import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import { textIn } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"
import type { CompanionTraitTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import { temperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"

type Row = Readonly<Record<string, unknown>>

type EffectType = NonNullable<CompanionTraitTemplate["effectType"]>

const QUALITIES: readonly EquipmentQualityId[] = ["normal", "fine", "superior", "epic", "legendary"]

const EFFECT_TYPES: readonly EffectType[] = ["fractional-change", "integer"]

export const TRAIT_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "description",
  "metricId",
  "effectType",
  "isReduction",
  "hashPlace",
]

export const GRADE_KEYS: readonly string[] = ["slug", "thing", "quality", "value"]

function effectTypeIn(said: unknown, at: string): EffectType | null {
  if (said === undefined || said === null) return null
  for (const one of EFFECT_TYPES) {
    if (said === one) return one
  }
  throw new Error(
    `${at} states \`${String(said)}\`, and a trait moves ${EFFECT_TYPES.join(" or ")}`
  )
}

function placeIn(said: unknown, at: string): number {
  if (typeof said === "number" && Number.isInteger(said) && said >= 0) return said
  throw new Error(`${at} states no build-hash place`)
}

function valuesByTrait(grades: readonly Row[]): Map<string, Map<string, number>> {
  const byTrait = new Map<string, Map<string, number>>()
  for (const grade of grades) {
    const at = String(grade.slug ?? "a companion trait grade")
    const trait = textIn(slugAt(grade, "thing"), "thing", at)
    const quality = textIn(slugAt(grade, "quality"), "quality", at)
    if (typeof grade.value !== "number") throw new Error(`${at} states no value`)
    const held = byTrait.get(trait) ?? new Map<string, number>()
    held.set(quality, grade.value)
    byTrait.set(trait, held)
  }
  return byTrait
}

function qualityValuesIn(
  held: Map<string, number> | undefined,
  at: string
): Record<EquipmentQualityId, number> | null {
  if (held === undefined) return null
  const values: Partial<Record<EquipmentQualityId, number>> = {}
  for (const quality of QUALITIES) {
    const value = held.get(quality)
    if (value === undefined) throw new Error(`${at} has no grade at ${quality}`)
    values[quality] = value
  }
  return values as Record<EquipmentQualityId, number>
}

export function companionTraitsFrom(
  traits: readonly Row[],
  grades: readonly Row[]
): readonly CompanionTraitTemplate[] {
  const byTrait = valuesByTrait(grades)
  const placed = traits
    .map((row) => {
      const at = String(row.slug ?? row.key ?? "a companion trait")
      const id = textIn(row.key, "key", at)
      const metric = slugAt(row, "metricId")
      const trait: CompanionTraitTemplate = {
        id,
        name: textIn(row.title, "title", at),
        description: typeof row.description === "string" ? row.description : "",
        metricId: metric === null ? null : (metric as CompanionMetricId),
        effectType: effectTypeIn(row.effectType, at),
        isReduction: row.isReduction === true,
        qualityValues: qualityValuesIn(byTrait.get(String(row.slug ?? id)), at),
      }
      return { place: placeIn(row.hashPlace, at), trait }
    })
    .sort((a, b) => a.place - b.place)
  for (const [index, { place, trait }] of placed.entries()) {
    if (place !== index) {
      throw new Error(`${trait.id} states build-hash place ${place}, and its place is ${index}`)
    }
  }
  return placed.map(({ trait }) => trait)
}

export async function readCompanionTraits(): Promise<readonly CompanionTraitTemplate[]> {
  const [traits, grades] = await Promise.all([
    getPages({
      pageTypeSlug: temperCompanionTrait.slug,
      select: [...TRAIT_KEYS],
      order: [{ by: "hashPlace", dir: "asc" }],
      limit: 500,
    }),
    getPages({
      pageTypeSlug: temperCompanionTraitGrade.slug,
      select: [...GRADE_KEYS],
      order: [{ by: "slug", dir: "asc" }],
      limit: 500,
    }),
  ])
  return companionTraitsFrom(traits.rows, grades.rows)
}
