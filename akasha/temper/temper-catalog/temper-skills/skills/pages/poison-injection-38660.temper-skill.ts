import type { TemperSkill } from "../temper-skill.page-type.ts"

export const poisonInjection38660 = {
  id: "01a05fd1-2e15-7ddd-a07f-25cb776a4975",
  pageTypeSlug: "temper-skill",
  slug: "poison-injection-38660",
  title: "Poison Injection",
  key: "poison-injection-38660",
  baseName: "Poison Arrow",
  description:
    '"Shoot an arrow coated in Baandari poison at an enemy, dealing |cffffff4038|r Poison Damage and an additional |cffffff11420|r Poison Damage over |cffffff20|r seconds.\\n\\nDeals up to |cffffff120|r% more damage to enemies under |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_bow_002_b.dds",
  esoSkillId: 38660,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
