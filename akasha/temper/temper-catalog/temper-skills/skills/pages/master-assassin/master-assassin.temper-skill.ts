import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const masterAssassin = {
  id: "019e6245-a6ca-7f43-b9f3-98f63375c08b",
  pageTypeSlug: "temper-skill",
  slug: "master-assassin",
  title: "Master Assassin",
  key: "master-assassin",
  baseName: "Master Assassin",
  description:
    '"Increases your Critical Chance rating against enemies you are flanking by 1448, increasing your chance to critically strike by |6.6%."',
  icon: "/esoui/art/icons/passive_weapon_026.dds",
  esoSkillId: 45038,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-assassination",
  skillType: "passive",
  subcategoryId: "nightblade-assassination",
  effects: "jsonl",
} as const satisfies TemperSkill
