import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const innerRage = {
  id: "01a05fd0-dcc7-7a6f-87af-0e2d69844843",
  pageTypeSlug: "temper-skill",
  slug: "inner-rage",
  title: "Inner Rage",
  key: "inner-rage",
  baseName: "Inner Fire",
  description:
    '"Ignite the fires of hate in an enemy\'s heart, dealing 1079 Flame Damage and taunting them to attack you for 15 seconds.\\n\\nUp to 3 allies targeting the taunted enemy can activate the Radiate synergy, dealing 1344 Flame Damage to them over 3 seconds then an additional 2249 Flame Damage to them and other nearby enemies."',
  icon: "/esoui/art/icons/ability_undaunted_002_b.dds",
  esoSkillId: 43378,
  isMorph: true,
  learnedLevel: 3,
  lineRankNeeded: 3,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
