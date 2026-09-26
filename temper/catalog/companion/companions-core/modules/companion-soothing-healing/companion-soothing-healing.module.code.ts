import { getCompanionTraitMetricEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { isTwoHandedWeapon } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"

export function computeSoothingHealingDone(build: CompanionState): number {
  let total = 0
  const { armor, jewelry, weapons } = build.equipment

  for (const slot of Object.values(armor)) {
    if (slot.itemType === "armor" && slot.data.trait === "soothing") {
      const effect = getCompanionTraitMetricEffect("soothing", slot.data.quality, false)
      if (effect) total += effect.effectValue
    }
  }
  for (const slot of Object.values(jewelry)) {
    if (slot.itemType === "jewelry" && slot.data.trait === "soothing") {
      const effect = getCompanionTraitMetricEffect("soothing", slot.data.quality, false)
      if (effect) total += effect.effectValue
    }
  }
  for (const slot of Object.values(weapons)) {
    if (slot.itemType === "weapon" && slot.data.trait === "soothing") {
      const isTwoHanded = isTwoHandedWeapon(slot.data.type)
      const effect = getCompanionTraitMetricEffect("soothing", slot.data.quality, isTwoHanded)
      if (effect) total += effect.effectValue
    }
  }

  return total
}
