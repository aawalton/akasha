import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantStaminaLegendary = {
  id: "01a0d3e8-4202-705d-aa8b-92dcfda54135",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-stamina-legendary",
  title: "Stamina at Legendary",
  thing: "temper-armor-enchant/stamina",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 868,
  createdAt: "2026-09-24T14:53:28.962Z",
  updatedAt: "2026-09-24T14:53:35.000Z",
} as const satisfies TemperGearGrade
