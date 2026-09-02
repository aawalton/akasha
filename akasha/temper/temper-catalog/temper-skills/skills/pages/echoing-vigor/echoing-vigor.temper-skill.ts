import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const echoingVigor = {
  id: "01a05fd0-8e13-7a7a-8fa0-f6f0c37fed54",
  pageTypeSlug: "temper-skill",
  slug: "echoing-vigor",
  title: "Echoing Vigor",
  key: "echoing-vigor",
  baseName: "Vigor",
  description:
    '"Let loose a battle cry, instilling you and your allies with resolve and healing for 3480 Health over 16 seconds."',
  icon: "/esoui/art/icons/ability_ava_echoing_vigor.dds",
  esoSkillId: 63247,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
