import type { CompanionArmorWeight } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import {
  type CompanionEquipmentQualityId,
  companionEquipmentQualityAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"

export function getCompanionArmorBaseValue(
  weight: CompanionArmorWeight,
  quality: CompanionEquipmentQualityId = "legendary"
): number {
  if (quality === "no-quality") return 0
  if (weight === "no-weight") return 0
  const values = companionEquipmentQualityAt(quality).baseValues
  if (weight === "light") return values.lightArmor
  if (weight === "medium") return values.mediumArmor
  return values.heavyArmor
}
