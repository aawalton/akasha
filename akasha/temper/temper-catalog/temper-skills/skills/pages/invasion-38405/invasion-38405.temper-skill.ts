import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const invasion38405 = {
  id: "01a05fd0-dcca-74f4-8360-aa5b85a889b2",
  pageTypeSlug: "temper-skill",
  slug: "invasion-38405",
  title: "Invasion",
  key: "invasion-38405",
  baseName: "Shield Charge",
  description:
    '"Rush an enemy and ram them, dealing |cffffff4845|r Physical Damage and stunning them for |cffffff4|r seconds.\\n\\nStuns up to |cffffff50|r% longer based on the distance traveled."',
  icon: "/esoui/art/icons/ability_1handed_003_b.dds",
  esoSkillId: 38405,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
