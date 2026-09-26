import {
  type CompanionEquipmentQualityId,
  type CompanionEquipmentQualityTemplate,
  companionEquipmentQualities,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"

const LEGENDARY_ELIGIBLE_SLOT_IDS = new Set(["ring-1", "ring-2"])

export function availableQualityOptions(): readonly CompanionEquipmentQualityTemplate[] {
  return companionEquipmentQualities().filter((q) => q.available)
}

export function legendaryQualityOptions(): readonly CompanionEquipmentQualityTemplate[] {
  return companionEquipmentQualities().filter((q) => q.available || q.id === "legendary")
}

export function getAvailableQualityOptions(
  slotId?: string
): readonly CompanionEquipmentQualityTemplate[] {
  if (slotId != null && LEGENDARY_ELIGIBLE_SLOT_IDS.has(slotId)) return legendaryQualityOptions()
  return availableQualityOptions()
}

export function capQualityForSlot(
  slotId: string,
  quality: CompanionEquipmentQualityId
): CompanionEquipmentQualityId {
  if (quality === "legendary" && !LEGENDARY_ELIGIBLE_SLOT_IDS.has(slotId)) return "epic"
  return quality
}
