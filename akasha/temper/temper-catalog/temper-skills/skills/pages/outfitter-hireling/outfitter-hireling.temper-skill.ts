import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const outfitterHireling = {
  id: "019e6224-cca7-74cb-8c0f-11dfe985cd4f",
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
