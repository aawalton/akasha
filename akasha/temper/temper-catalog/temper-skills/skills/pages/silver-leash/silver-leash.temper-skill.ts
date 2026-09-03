import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const silverLeash = {
  id: "019e6238-c30e-7ae8-940a-f994181c6457",
  pageTypeSlug: "temper-skill",
  slug: "silver-leash",
  title: "Silver Leash",
  key: "silver-leash",
  baseName: "Silver Bolts",
  description:
    '"Fire a Dawnguard\'s crossbow hook to pull an enemy to you, dealing 1438 Physical Damage, taunting them for 15 seconds if they are not already taunted, and reducing their Movement Speed by 30% for 4 seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_003_b.dds",
  esoSkillId: 42696,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
