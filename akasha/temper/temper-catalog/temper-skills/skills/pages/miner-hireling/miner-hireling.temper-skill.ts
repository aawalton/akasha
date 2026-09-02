import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const minerHireling = {
  id: "01a05fd1-2dff-792a-bac4-fa5a0bd4b879",
  pageTypeSlug: "temper-skill",
  slug: "miner-hireling",
  title: "Miner Hireling",
  key: "miner-hireling",
  baseName: "Miner Hireling",
  description:
    '"A hireling will send you even more blacksmithing materials and possibly other items every day. You have a greater chance at better quality materials."',
  icon: "/esoui/art/icons/ability_smith_006.dds",
  esoSkillId: 48171,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-blacksmithing",
  skillType: "passive",
  subcategoryId: "craft-blacksmithing",
} as const satisfies TemperSkill
