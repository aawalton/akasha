import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.types.ts"

export const normal = {
  id: "01a05fcd-ea6c-7631-9744-b79d007bfe5c",
  type: "page-type/temper-companion-equipment-quality",
  slug: "normal",
  key: "normal",
  title: "Normal",
  available: true,
  displayOrder: 1,
  hashPlace: 1,
} as const satisfies TemperCompanionEquipmentQuality
