import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantStaminaFine = {
  id: "01a0d3e8-2929-7294-93ca-51f2ac1e2d39",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-stamina-fine",
  title: "Stamina at Fine",
  thing: "temper-armor-enchant/stamina",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 704,
  createdAt: "2026-09-24T14:53:22.601Z",
  updatedAt: "2026-09-24T14:53:35.000Z",
} as const satisfies TemperGearGrade
