import type { CompanionArmorSlotId } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-slots/companion-armor-slots.module.code.ts"
import type { CompanionArmorWeight } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import {
  companionCatalog,
  companionSlotAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionEquipmentQualityId } from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import type { CompanionJewelrySlotId } from "akasha/temper/catalog/companion/companions-core/modules/companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import {
  type CompanionWeaponTypeId,
  companionWeaponTypes,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { getEsoIconUrl } from "akasha/temper/player/character/formula-framework/modules/eso-icon-url/eso-icon-url.module.code.ts"

function equipmentIconUrl(iconName: string | null, suffix = ""): string | null {
  if (iconName === null) return null
  return getEsoIconUrl(`/esoui/art/icons/companions_u30_equipment_${iconName}${suffix}.dds`)
}

export function getCompanionArmorIcon(
  slotId: CompanionArmorSlotId,
  weight: CompanionArmorWeight = "no-weight"
): string | null {
  if (weight === "no-weight") return null
  const slot = companionSlotAt(companionCatalog().slots.armor, slotId)
  return equipmentIconUrl(slot.iconName, `_${weight}`)
}

export function getCompanionJewelryIcon(
  slotId: CompanionJewelrySlotId,
  quality: CompanionEquipmentQualityId = "no-quality"
): string | null {
  if (quality === "no-quality") return null
  return equipmentIconUrl(companionSlotAt(companionCatalog().slots.jewelry, slotId).iconName)
}

export function getCompanionWeaponIcon(weaponType: CompanionWeaponTypeId): string | null {
  const type = companionWeaponTypes().find((one) => one.id === weaponType)
  return equipmentIconUrl(type?.iconName ?? null)
}
