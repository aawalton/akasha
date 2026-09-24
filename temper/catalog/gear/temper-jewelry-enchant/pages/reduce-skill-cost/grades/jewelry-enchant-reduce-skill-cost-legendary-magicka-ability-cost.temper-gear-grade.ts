import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostLegendaryMagickaAbilityCost = {
  id: "01a0d3ec-a5cb-7e92-8ab7-387b638d17da",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-legendary-magicka-ability-cost",
  title: "Reduce Skill Cost at Legendary on Magicka Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 135,
} as const satisfies TemperGearGrade
