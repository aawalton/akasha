import type { TemperSkill } from "../temper-skill.page-type.ts"

export const elementalForce = {
  id: "01a05fd0-8e16-71e9-97b4-8998f730e128",
  pageTypeSlug: "temper-skill",
  slug: "elemental-force",
  title: "Elemental Force",
  key: "elemental-force",
  baseName: "Elemental Force",
  description: '"Increases your chance to apply status effects by 100%."',
  icon: "/esoui/art/icons/ability_weapon_005.dds",
  esoSkillId: 45512,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-destruction-staff",
  skillType: "passive",
  subcategoryId: "weapon-destruction-staff",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
