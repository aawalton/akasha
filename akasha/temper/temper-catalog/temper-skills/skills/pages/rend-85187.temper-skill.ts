import type { TemperSkill } from "../temper-skill.page-type.ts"

export const rend85187 = {
  id: "01a05fd1-7c87-7525-b603-aa9751b29c5b",
  pageTypeSlug: "temper-skill",
  slug: "rend-85187",
  title: "Rend",
  key: "rend-85187",
  baseName: "Lacerate",
  description:
    '"Slash enemies in front of you, causing them to bleed for |cffffff42489|r Bleed Damage over |cffffff16|r seconds and healing you for |cffffff51|r% of the damage done.\\n\\nEach tick applies the Hemorrhaging status effect."',
  icon: "/esoui/art/icons/ability_dualwield_006_a.dds",
  esoSkillId: 85187,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 50,
  skillLineId: "weapon-dual-wield",
  skillType: "ultimate",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
