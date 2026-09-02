import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const conditioning = {
  id: "01a05fd0-439f-7b79-bf84-7349eea322cd",
  pageTypeSlug: "temper-skill",
  slug: "conditioning",
  title: "Conditioning",
  key: "conditioning",
  baseName: "Conditioning",
  description: '"Increases your Max Stamina by 2000."',
  icon: "/esoui/art/icons/ability_dragonknight_021.dds",
  esoSkillId: 117754,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-redguard-skills",
  skillType: "passive",
  subcategoryId: "racial-redguard-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
