import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const robustness = {
  id: "019e624a-12db-7ea4-a62e-b0ccb2882414",
  pageTypeSlug: "temper-skill",
  slug: "robustness",
  title: "Robustness",
  key: "robustness",
  baseName: "Robustness",
  description: '"Increases your Health, Magicka, and Stamina Recovery by 90."',
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 70390,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-khajiit-skills",
  skillType: "passive",
  subcategoryId: "racial-khajiit-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
