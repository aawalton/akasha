import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const noSkill = {
  id: "01a05fd1-2e08-78d7-ad09-351cf8b64cf0",
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
