import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostFineMagickaAbilityCost = {
  id: "01a0d3ec-5e3c-70d9-82be-f78c2ab9ee38",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-fine-magicka-ability-cost",
  title: "Reduce Skill Cost at Fine on Magicka Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 111,
} as const satisfies TemperGearGrade
