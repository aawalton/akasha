import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const combatMedic = {
  id: "01a05fd0-439a-7b62-82bd-cb98de3ef4ec",
  pageTypeSlug: "temper-skill",
  slug: "combat-medic",
  title: "Combat Medic",
  key: "combat-medic",
  baseName: "Combat Medic",
  description: '"Increases your healing done by 20% when you are near a Keep."',
  icon: "/esoui/art/icons/ability_sorcerer_045.dds",
  esoSkillId: 45624,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-support",
  skillType: "passive",
  subcategoryId: "alliance-war-support",
  status: "unsupported",
} as const satisfies TemperSkill
