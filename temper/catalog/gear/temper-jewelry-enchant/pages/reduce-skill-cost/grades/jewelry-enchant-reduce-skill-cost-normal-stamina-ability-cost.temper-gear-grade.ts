import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostNormalStaminaAbilityCost = {
  id: "01a0d3ec-7d21-799b-955a-028c96338995",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-normal-stamina-ability-cost",
  title: "Reduce Skill Cost at Normal on Stamina Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 103,
} as const satisfies TemperGearGrade
