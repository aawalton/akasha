import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const echoingVigor = {
  id: "019e6251-4cab-7fad-be0f-fd157585a0dd",
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
