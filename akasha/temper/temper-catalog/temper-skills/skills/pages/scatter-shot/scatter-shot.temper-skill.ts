import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scatterShot = {
  id: "01a05fd1-7cb2-7246-bf55-be847bc6b045",
  pageTypeSlug: "temper-skill",
  slug: "scatter-shot",
  title: "Scatter Shot",
  key: "scatter-shot",
  baseName: "Scatter Shot",
  description:
    '"Blast an enemy with an explosive arrow, dealing |cffffff4846|r Physical Damage, knocking them back |cffffff8|r meters."',
  icon: "/esoui/art/icons/ability_bow_004.dds",
  esoSkillId: 28879,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
