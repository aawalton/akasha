import type { TemperSkill } from "../temper-skill.page-type.ts"

export const outfitterHireling = {
  id: "01a05fd1-2e0a-73c3-817f-efd740a50f58",
  pageTypeSlug: "temper-skill",
  slug: "outfitter-hireling",
  title: "Outfitter Hireling",
  key: "outfitter-hireling",
  baseName: "Outfitter Hireling",
  description:
    '"A hireling will send you even more clothing materials and possibly other items every day. You have a greater chance at better quality materials."',
  icon: "/esoui/art/icons/ability_tradecraft_007.dds",
  esoSkillId: 48201,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-clothing",
  skillType: "passive",
  subcategoryId: "craft-clothing",
} as const satisfies TemperSkill
