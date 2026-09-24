import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostEpicStaminaAbilityCost = {
  id: "01a0d3ec-4799-7c5b-ac2c-165f21c78243",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-epic-stamina-ability-cost",
  title: "Reduce Skill Cost at Epic on Stamina Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 127,
} as const satisfies TemperGearGrade
