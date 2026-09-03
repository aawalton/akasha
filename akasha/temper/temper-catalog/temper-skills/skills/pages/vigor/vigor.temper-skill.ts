import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vigor = {
  id: "019e6f53-a9c4-76c6-8322-fe0d48b51c66",
  pageTypeSlug: "temper-skill",
  slug: "vigor",
  title: "Vigor",
  key: "vigor",
  baseName: "Vigor",
  description:
    '"Let loose a battle cry, instilling yourself and nearby allies with resolve and healing them for |cffffff10950|r Health over |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_ava_vigor.dds",
  esoSkillId: 61503,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
