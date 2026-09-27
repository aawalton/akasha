import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { WeaponTraitId as WeaponTraitPageSlug } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  offeredTraits,
  type TraitTemplate,
  traitGradeValue,
  traitTable,
} from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"

export type WeaponTraitId = WeaponTraitPageSlug

export const weaponTraits = traitTable<WeaponTraitId>("weapon")

export function weaponTraitOptions(current: string): readonly TraitTemplate<WeaponTraitId>[] {
  return offeredTraits(weaponTraits, current)
}

export function weaponTraitWorth(traitId: WeaponTraitId, quality: EquipmentQualityId): number {
  return traitGradeValue("weapon", traitId, quality)
}

export function getNirnhonedWeaponBonus(quality: EquipmentQualityId = "legendary"): number {
  return weaponTraitWorth("nirnhoned", quality)
}

export function getInfusedWeaponBonus(quality: EquipmentQualityId = "legendary"): number {
  return weaponTraitWorth("infused", quality)
}
