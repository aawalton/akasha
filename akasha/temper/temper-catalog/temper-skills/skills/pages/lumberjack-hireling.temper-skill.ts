import type { TemperSkill } from "../temper-skill.page-type.ts"

export const lumberjackHireling = {
  id: "01a05fd1-2dee-7597-9cd2-a0d14f72d04d",
  pageTypeSlug: "temper-skill",
  slug: "lumberjack-hireling",
  title: "Lumberjack Hireling",
  key: "lumberjack-hireling",
  baseName: "Lumberjack Hireling",
  description:
    '"A hireling will send you even more woodworking materials and possibly other items every day. You have a greater chance at better quality materials."',
  icon: "/esoui/art/icons/ability_tradecraft_007.dds",
  esoSkillId: 48186,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-woodworking",
  skillType: "passive",
  subcategoryId: "craft-woodworking",
} as const satisfies TemperSkill
