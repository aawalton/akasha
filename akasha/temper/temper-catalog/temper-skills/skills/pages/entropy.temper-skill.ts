import type { TemperSkill } from "../temper-skill.page-type.ts"

export const entropy = {
  id: "01a05fd0-8e23-7273-96b8-7dd20ecb8a90",
  pageTypeSlug: "temper-skill",
  slug: "entropy",
  title: "Entropy",
  key: "entropy",
  baseName: "Entropy",
  description:
    '"Bind an enemy with chaotic magic, dealing |cffffff15224|r Magic Damage over |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_004.dds",
  esoSkillId: 28567,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
