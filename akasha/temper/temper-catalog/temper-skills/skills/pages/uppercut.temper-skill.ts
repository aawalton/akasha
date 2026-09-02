import type { TemperSkill } from "../temper-skill.page-type.ts"

export const uppercut = {
  id: "01a05fd1-d282-710d-bd46-cfc112d5ad74",
  pageTypeSlug: "temper-skill",
  slug: "uppercut",
  title: "Uppercut",
  key: "uppercut",
  baseName: "Uppercut",
  description: '"Slam an enemy with an upward swing, dealing |cffffff9288|r Physical Damage."',
  icon: "/esoui/art/icons/ability_2handed_001.dds",
  esoSkillId: 28279,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
