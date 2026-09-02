import type { TemperSkill } from "../temper-skill.page-type.ts"

export const structuredEntropy = {
  id: "01a05fd1-d248-7700-8948-95ae1c016fab",
  pageTypeSlug: "temper-skill",
  slug: "structured-entropy",
  title: "Structured Entropy",
  key: "structured-entropy",
  baseName: "Entropy",
  description:
    '"Bind an enemy with chaotic magic, dealing 4642 Magic Damage over 20 seconds, and healing you for 435 every 2 seconds."',
  icon: "/esoui/art/icons/ability_mageguild_004_b.dds",
  esoSkillId: 42240,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
