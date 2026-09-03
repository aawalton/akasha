import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const forceful = {
  id: "019e6226-00f4-7674-aba6-38a0517e570b",
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
  effects: "jsonl",
} as const satisfies TemperSkill
