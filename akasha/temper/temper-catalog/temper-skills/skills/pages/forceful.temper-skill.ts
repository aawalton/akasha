import type { TemperSkill } from "../temper-skill.page-type.ts"

export const forceful = {
  id: "01a05fd0-dc93-75a2-bc93-8dd47e0ab0e5",
  pageTypeSlug: "temper-skill",
  slug: "forceful",
  title: "Forceful",
  key: "forceful",
  baseName: "Forceful",
  description:
    '"Your Light and Heavy Attacks damage up to 3 other nearby enemies for 100% of the damage inflicted to the primary target."',
  icon: "/esoui/art/icons/ability_weapon_027.dds",
  esoSkillId: 45444,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-two-handed",
  skillType: "passive",
  subcategoryId: "weapon-two-handed",
  status: "unsupported",
} as const satisfies TemperSkill
