import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const silverBolts = {
  id: "01a05fd1-7cc4-7d5d-9931-a54a3612200c",
  pageTypeSlug: "temper-skill",
  slug: "silver-bolts",
  title: "Silver Bolts",
  key: "silver-bolts",
  baseName: "Silver Bolts",
  description:
    '"Fire a Dawnguard Vampire Hunter\'s crossbow bolt to strike an enemy, dealing |cffffff7269|r Physical Damage."',
  icon: "/esoui/art/icons/ability_fightersguild_003.dds",
  esoSkillId: 35721,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
