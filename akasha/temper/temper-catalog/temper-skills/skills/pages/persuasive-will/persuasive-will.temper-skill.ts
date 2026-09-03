import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const persuasiveWill = {
  id: "019e6238-c2f5-71d2-b2e4-4738e81cdaaa",
  pageTypeSlug: "temper-skill",
  slug: "persuasive-will",
  title: "Persuasive Will",
  key: "persuasive-will",
  baseName: "Persuasive Will",
  description: '"Allows you to Persuade NPCs in conversation."',
  icon: "/esoui/art/icons/ability_weapon_024.dds",
  esoSkillId: 29061,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "passive",
  subcategoryId: "guild-mages-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
