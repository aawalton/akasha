import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSkillCostNormalMagickaAbilityCost = {
  id: "01a0d3ec-721e-7345-b193-2309c335a3d4",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-skill-cost-normal-magicka-ability-cost",
  title: "Reduce Skill Cost at Normal on Magicka Ability Cost",
  thing: "temper-jewelry-enchant/reduce-skill-cost",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 103,
} as const satisfies TemperGearGrade
