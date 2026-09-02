import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const poisonInjection = {
  id: "01a05fd1-2e14-73f2-b2fd-283301d2ab39",
  pageTypeSlug: "temper-skill",
  slug: "poison-injection",
  title: "Poison Injection",
  key: "poison-injection",
  baseName: "Poison Arrow",
  description:
    '"Shoot an arrow coated in Baandari poison at an enemy, dealing 1161 Poison Damage and an additional 3470 Poison Damage over 20 seconds.\\n\\nDeals up to 120% more damage to enemies under 50% Health."',
  icon: "/esoui/art/icons/ability_bow_002_b.dds",
  esoSkillId: 40842,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
