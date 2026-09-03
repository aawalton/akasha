import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceWarHorn = {
  id: "019e6f53-a9b0-712c-bb88-c3f7402dde77",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-war-horn",
  title: "Vengeance War Horn",
  key: "vengeance-war-horn",
  baseName: "Vengeance War Horn",
  description:
    '"Sound a war horn to rally your forces, increasing you and up to 5 of your group members\' Health, Magicka, and Stamina Recovery by |cffffff2500|r for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_ava_003.dds",
  esoSkillId: 244644,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-assault",
  skillType: "ultimate",
  subcategoryId: "vengeance-alliance-war-assault",
} as const satisfies TemperSkill
