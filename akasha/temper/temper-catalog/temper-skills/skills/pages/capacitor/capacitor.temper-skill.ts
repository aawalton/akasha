import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const capacitor = {
  id: "019e6245-a60f-7263-966b-e74f1b854f8f",
  pageTypeSlug: "temper-skill",
  slug: "capacitor",
  title: "Capacitor",
  key: "capacitor",
  baseName: "Capacitor",
  description: '"Increases your Health, Magicka, and Stamina Recovery by 141."',
  icon: "/esoui/art/icons/ability_sorcerer_013.dds",
  esoSkillId: 45188,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-storm-calling",
  skillType: "passive",
  subcategoryId: "sorcerer-storm-calling",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
