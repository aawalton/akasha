import type { TemperSkill } from "../temper-skill.page-type.ts"

export const capacitor = {
  id: "01a05fd0-4386-72ca-b741-365dd5207fcc",
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
} as const satisfies TemperSkill
