import {
  type EquipmentQualityOptionId,
  equipmentQualities,
} from "@akasha/temper-equipment-kinds/equipment-qualities"

export function getQualityVariant(
  quality: EquipmentQualityOptionId,
  mutedVariant: "elevation-muted" = "elevation-muted"
): "elevation-muted" | "normal" | "fine" | "superior" | "epic" | "legendary" | "mythic" {
  if (quality === "no-quality") return mutedVariant
  return quality
}

export function getQualityClassName(quality: EquipmentQualityOptionId): string {
  if (quality === "no-quality") return ""
  return `text-${quality}`
}

export function getQualityLabel(quality: EquipmentQualityOptionId): string {
  return equipmentQualities.data[quality]?.name ?? "No Quality"
}

export const AVAILABLE_QUALITY_OPTIONS = equipmentQualities.list.filter((q) => q.available)
