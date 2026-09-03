import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const echoingVigor61505 = {
  id: "019e6f53-a102-7bc3-9cb5-de933bdd5c31",
  pageTypeSlug: "temper-skill",
  slug: "echoing-vigor-61505",
  title: "Echoing Vigor",
  key: "echoing-vigor-61505",
  baseName: "Vigor",
  description:
    '"Let loose a battle cry, instilling you and your allies with resolve and healing for |cffffff16434|r Health over |cffffff16|r seconds."',
  icon: "/esoui/art/icons/ability_ava_echoing_vigor.dds",
  esoSkillId: 61505,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
