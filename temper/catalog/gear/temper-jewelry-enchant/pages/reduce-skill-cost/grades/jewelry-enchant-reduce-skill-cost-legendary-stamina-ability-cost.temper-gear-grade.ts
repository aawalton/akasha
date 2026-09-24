import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostLegendaryStaminaAbilityCost = {
  id: "01a0d3ec-b099-7e04-b749-06b8292636e8",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-legendary-stamina-ability-cost",
  title: "Reduce Skill Cost at Legendary on Stamina Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 135,
} as const satisfies TemperGearGrade
