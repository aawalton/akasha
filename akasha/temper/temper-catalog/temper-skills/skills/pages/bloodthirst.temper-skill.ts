import type { TemperSkill } from "../temper-skill.page-type.ts"

export const bloodthirst = {
  id: "01a05fd0-4372-7a5d-b8f0-d94a5e65c226",
  pageTypeSlug: "temper-skill",
  slug: "bloodthirst",
  title: "Bloodthirst",
  key: "bloodthirst",
  baseName: "Flurry",
  description:
    '"Flood an enemy with steel, battering them with four consecutive attacks that each deal 689 Bleed Damage and heal you for 33% of the damage caused."',
  icon: "/esoui/art/icons/ability_dualwield_002_a.dds",
  esoSkillId: 40599,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
