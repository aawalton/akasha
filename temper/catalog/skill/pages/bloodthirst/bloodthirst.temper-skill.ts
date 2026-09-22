import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodthirst = {
  id: "019e6226-00d8-7a2b-9562-efc2f804aacf",
  type: "page-type/temper-skill",
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
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
