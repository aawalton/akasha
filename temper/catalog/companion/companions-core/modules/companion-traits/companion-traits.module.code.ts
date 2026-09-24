import {
  type CompanionTable,
  companionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionEquipmentQualityId } from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import type { CompanionMetricEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-effect/companion-metric-effect.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"

export interface CompanionTraitTemplate {
  id: string
  name: string
  description: string
  metricId: CompanionMetricId | null
  effectType: ("fractional-change" | "integer") | null
  isReduction: boolean
  qualityValues: Record<EquipmentQualityId, number> | null
}

export type CompanionTraitId = string

export function companionTraits(): CompanionTable<CompanionTraitTemplate> {
  const catalog = companionCatalog()
  return {
    data: catalog.traitsById,
    ids: catalog.traitIds,
    list: catalog.traits,
    has: (id) => catalog.traitsById[id] !== undefined,
  }
}

export function companionTraitAt(id: string): CompanionTraitTemplate {
  const trait = companionCatalog().traitsById[id]
  if (trait === undefined) throw new Error(`no companion trait page answers to \`${id}\``)
  return trait
}

export function getCompanionTraitMetricEffect(
  traitId: CompanionTraitId,
  quality: CompanionEquipmentQualityId = "legendary",
  isTwoHanded: boolean = false
): CompanionMetricEffect | null {
  if (traitId === "no-trait") return null
  if (quality === "no-quality") return null

  const trait = companionTraitAt(traitId)
  if (trait.metricId == null || trait.effectType == null || trait.qualityValues == null) return null

  const baseValue = trait.qualityValues[quality]
  const value = isTwoHanded ? baseValue * 2 : baseValue
  const effectValue = trait.isReduction ? -value : value

  return {
    metricId: trait.metricId,
    effectType: trait.effectType,
    effectValue,
  }
}
