import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostSuperiorStaminaAbilityCost = {
  id: "01a0d3ec-90e7-7ab2-879c-330e32b0171b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-superior-stamina-ability-cost",
  title: "Reduce Skill Cost at Superior on Stamina Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 119,
} as const satisfies TemperGearGrade
