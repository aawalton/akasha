import type { TemperSkill } from "../temper-skill.page-type.ts"

export const piercingCold = {
  id: "01a05fd1-2e12-7a21-a1cd-86251a6ea7a3",
  pageTypeSlug: "temper-skill",
  slug: "piercing-cold",
  title: "Piercing Cold",
  key: "piercing-cold",
  baseName: "Piercing Cold",
  description:
    '"Increases the amount of damage you block by 8% and increases your Frost Damage by 15%."',
  icon: "/esoui/art/icons/passive_warden_004.dds",
  esoSkillId: 86196,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-winters-embrace",
  skillType: "passive",
  subcategoryId: "warden-winters-embrace",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
