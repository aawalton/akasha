import type { TemperSkill } from "../temper-skill.page-type.ts"

export const recipeImprovement = {
  id: "01a05fd1-2e2f-77c5-9e74-30999f23ca2d",
  pageTypeSlug: "temper-skill",
  slug: "recipe-improvement",
  title: "Recipe Improvement",
  key: "recipe-improvement",
  baseName: "Recipe Improvement",
  description: '"Allows the making of up to Champion 150 Recipes."',
  icon: "/esoui/art/icons/ability_provisioner_001.dds",
  esoSkillId: 44650,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 6,
  skillLineId: "craft-provisioning",
  skillType: "passive",
  subcategoryId: "craft-provisioning",
} as const satisfies TemperSkill
