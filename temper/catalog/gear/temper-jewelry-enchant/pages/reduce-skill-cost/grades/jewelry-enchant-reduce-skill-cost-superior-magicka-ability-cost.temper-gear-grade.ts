import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostSuperiorMagickaAbilityCost = {
  id: "01a0d3ec-884c-78aa-bc79-7dafc46aca41",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-superior-magicka-ability-cost",
  title: "Reduce Skill Cost at Superior on Magicka Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 119,
} as const satisfies TemperGearGrade
