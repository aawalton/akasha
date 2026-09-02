import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceEntropy = {
  id: "01a05fd1-d29f-7d99-8a3e-6d2cbe109fe2",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-entropy",
  title: "Vengeance Entropy",
  key: "vengeance-entropy",
  baseName: "Vengeance Entropy",
  description:
    '"Bind an enemy with chaotic magic, dealing |cffffff16800|r Magic Damage over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_004.dds",
  esoSkillId: 246479,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-mages-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-mages-guild",
} as const satisfies TemperSkill
