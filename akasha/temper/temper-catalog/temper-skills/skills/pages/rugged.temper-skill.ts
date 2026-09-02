import type { TemperSkill } from "../temper-skill.page-type.ts"

export const rugged = {
  id: "01a05fd1-7c9f-7f74-b8e6-4fdcc501ac30",
  pageTypeSlug: "temper-skill",
  slug: "rugged",
  title: "Rugged",
  key: "rugged",
  baseName: "Rugged",
  description: '"Increases your Physical and Spell Resistance by 2600."',
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 45306,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-nord-skills",
  skillType: "passive",
  subcategoryId: "racial-nord-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
