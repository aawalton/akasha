import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostEpicMagickaAbilityCost = {
  id: "01a0d3ec-3d6a-71d3-a703-64bf51007890",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-epic-magicka-ability-cost",
  title: "Reduce Skill Cost at Epic on Magicka Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 127,
} as const satisfies TemperGearGrade
