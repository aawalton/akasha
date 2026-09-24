import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmEpicPowerSpell = {
  id: "01a0d3e9-c499-731c-b79b-02a150869f0c",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-epic-power-spell",
  title: "Increase Physical Harm at Epic on Power Spell",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-power-spell",
  value: 160,
} as const satisfies TemperGearGrade
