import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { CompanionArmorWeight } from "../companion-armor-weights/companion-armor-weights.module.code.ts"
import type { CompanionEquipmentQualityId } from "../companion-equipment-qualities/companion-equipment-qualities.module.code.ts"

const ARMOR_BASE_VALUES: Record<
  Exclude<CompanionArmorWeight, "no-weight">,
  Record<EquipmentQualityId, number>
> = {
  light: {
    normal: 600,
    fine: 700,
    superior: 800,
    epic: 900,
    legendary: 1000,
  },
  medium: {
    normal: 1600,
    fine: 1700,
    superior: 1800,
    epic: 1900,
    legendary: 2000,
  },
  heavy: {
    normal: 2600,
    fine: 2700,
    superior: 2800,
    epic: 2900,
    legendary: 3000,
  },
}

export function getCompanionArmorBaseValue(
  weight: CompanionArmorWeight,
  quality: CompanionEquipmentQualityId = "legendary"
): number {
  if (quality === "no-quality") return 0
  if (weight === "no-weight") return 0
  return ARMOR_BASE_VALUES[weight][quality]
}
