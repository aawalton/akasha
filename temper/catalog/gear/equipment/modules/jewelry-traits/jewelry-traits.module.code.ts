import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { JewelryTraitId as JewelryTraitPageSlug } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  offeredTraits,
  type TraitTemplate,
  traitGradeValue,
  traitTable,
} from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"

export type JewelryTraitId = JewelryTraitPageSlug

export const jewelryTraits = traitTable<JewelryTraitId>("jewelry")

export function jewelryTraitOptions(current: string): readonly TraitTemplate<JewelryTraitId>[] {
  return offeredTraits(jewelryTraits, current)
}

export function jewelryTraitWorth(traitId: JewelryTraitId, quality: EquipmentQualityId): number {
  return traitGradeValue("jewelry", traitId, quality)
}

export function getInfusedJewelryBonus(quality: EquipmentQualityId = "legendary"): number {
  return jewelryTraitWorth("infused", quality)
}
