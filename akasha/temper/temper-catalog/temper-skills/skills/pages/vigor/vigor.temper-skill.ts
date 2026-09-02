import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vigor = {
  id: "01a05fd2-1e92-72eb-b90c-f3299babfa6a",
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
