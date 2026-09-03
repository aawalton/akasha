import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const warHorn = {
  id: "019e6f53-a9d3-7e3d-ae39-e881df124486",
  pageTypeSlug: "temper-skill",
  slug: "war-horn",
  title: "War Horn",
  key: "war-horn",
  baseName: "War Horn",
  description:
    '"Sound a war horn to rally your forces, increasing you and your group\'s Max Magicka and Max Stamina by |cffffff10|r% for |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_ava_003.dds",
  esoSkillId: 38563,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "alliance-war-assault",
  skillType: "ultimate",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
