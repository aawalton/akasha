import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.types.ts"

export const noQuality = {
  id: "01a05fcd-ea6b-79a3-97c7-3589bcd355dc",
  type: "page-type/temper-companion-equipment-quality",
  slug: "no-quality",
  key: "no-quality",
  title: "No Quality",
  available: true,
  displayOrder: 0,
  hashPlace: 0,
} as const satisfies TemperCompanionEquipmentQuality
