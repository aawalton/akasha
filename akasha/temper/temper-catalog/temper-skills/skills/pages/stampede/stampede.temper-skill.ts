import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const stampede = {
  id: "019e6226-0117-7241-9965-fc4f21dc52bc",
  pageTypeSlug: "temper-skill",
  slug: "stampede",
  title: "Stampede",
  key: "stampede",
  baseName: "Critical Charge",
  description:
    '"Launch across the earth and smash an enemy, dealing 1393 Physical Damage to them and all nearby enemies. This attack is always a Critical Strike.\\n\\nAfter reaching your target, you sunder the ground beneath you, dealing 319 Physical Damage to all enemies in the area every 1 second for 15 seconds."',
  icon: "/esoui/art/icons/ability_2handed_003_a.dds",
  esoSkillId: 39807,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
