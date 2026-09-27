import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { ArmorTraitId as ArmorTraitPageSlug } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  offeredTraits,
  type TraitTemplate,
  traitGradeValue,
  traitTable,
} from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"

export type ArmorTraitId = ArmorTraitPageSlug

export const armorTraits = traitTable<ArmorTraitId>("armor")

export function armorTraitOptions(current: string): readonly TraitTemplate<ArmorTraitId>[] {
  return offeredTraits(armorTraits, current)
}

export function armorTraitWorth(traitId: ArmorTraitId, quality: EquipmentQualityId): number {
  return traitGradeValue("armor", traitId, quality)
}

export function getInfusedArmorBonus(quality: EquipmentQualityId = "legendary"): number {
  return armorTraitWorth("infused", quality)
}
