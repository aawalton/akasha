import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const antiquarianInsight = {
  id: "019e6251-4c84-7891-981b-e7e6151e0835",
  pageTypeSlug: "temper-skill",
  slug: "antiquarian-insight",
  title: "Antiquarian Insight",
  key: "antiquarian-insight",
  baseName: "Antiquarian Insight",
  description: '"Allows you to scry for Antiquities of up to Ultimate difficulty."',
  icon: "/esoui/art/icons/ability_scrying_05e.dds",
  esoSkillId: 141018,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 5,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
