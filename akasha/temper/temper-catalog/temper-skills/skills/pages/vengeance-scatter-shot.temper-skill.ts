import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceScatterShot = {
  id: "01a05fd2-1e84-7911-8ca5-356c16efbe0e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-scatter-shot",
  title: "Vengeance Scatter Shot",
  key: "vengeance-scatter-shot",
  baseName: "Vengeance Scatter Shot",
  description:
    '"Blast an enemy with an explosive arrow, dealing |cffffff4846|r Physical Damage, knocking them back |cffffff8|r meters."',
  icon: "/esoui/art/icons/ability_bow_004.dds",
  esoSkillId: 241261,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-bow",
  skillType: "active",
  subcategoryId: "vengeance-weapon-bow",
} as const satisfies TemperSkill
