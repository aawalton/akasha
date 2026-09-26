import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  type CompanionEquipmentQualityId,
  type CompanionEquipmentQualityTemplate,
  companionEquipmentQualities,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"

export function slotAllowsLegendary(slotId: string): boolean {
  return companionCatalog().slots.jewelry.some((slot) => slot.id === slotId && slot.allowsLegendary)
}

export function availableQualityOptions(): readonly CompanionEquipmentQualityTemplate[] {
  return companionEquipmentQualities().filter((q) => q.available)
}

export function legendaryQualityOptions(): readonly CompanionEquipmentQualityTemplate[] {
  return companionEquipmentQualities().filter((q) => q.available || q.id === "legendary")
}

function bestAvailableQuality(): CompanionEquipmentQualityId {
  const best = availableQualityOptions().at(-1)
  if (best === undefined) throw new Error("no companion quality page is available")
  return best.id
}

export function getAvailableQualityOptions(
  slotId?: string
): readonly CompanionEquipmentQualityTemplate[] {
  if (slotId != null && slotAllowsLegendary(slotId)) return legendaryQualityOptions()
  return availableQualityOptions()
}

export function capQualityForSlot(
  slotId: string,
  quality: CompanionEquipmentQualityId
): CompanionEquipmentQualityId {
  if (quality === "legendary" && !slotAllowsLegendary(slotId)) return bestAvailableQuality()
  return quality
}
