import type { TemperSkill } from "../temper-skill.page-type.ts"

export const snipe = {
  id: "01a05fd1-7ccd-735e-8005-232c07b90f6a",
  pageTypeSlug: "temper-skill",
  slug: "snipe",
  title: "Snipe",
  key: "snipe",
  baseName: "Snipe",
  description:
    '"Plant a masterfully aimed arrow in an enemy\'s vital spot, dealing |cffffff8359|r Physical Damage."',
  icon: "/esoui/art/icons/ability_bow_001.dds",
  esoSkillId: 28882,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
