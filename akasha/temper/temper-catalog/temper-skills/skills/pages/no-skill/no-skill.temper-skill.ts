import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const noSkill = {
  id: "019e6210-c5c5-7fc6-9bb8-5969540f95ad",
  pageTypeSlug: "temper-skill",
  slug: "no-skill",
  title: "No Skill",
  key: "no-skill",
  baseName: "No Skill",
  description: '"Empty skill slot"',
  esoSkillId: 0,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 0,
  morphIndex: 0,
  rank: 0,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "none",
} as const satisfies TemperSkill
