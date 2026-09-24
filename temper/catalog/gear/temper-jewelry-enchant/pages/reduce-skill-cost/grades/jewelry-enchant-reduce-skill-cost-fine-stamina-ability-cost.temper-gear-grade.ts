import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostFineStaminaAbilityCost = {
  id: "01a0d3ec-672b-78fc-b916-535418dd4456",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-fine-stamina-ability-cost",
  title: "Reduce Skill Cost at Fine on Stamina Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 111,
} as const satisfies TemperGearGrade
