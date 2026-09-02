import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const everlastingMagic = {
  id: "01a05fd0-8e26-7038-805a-65403a0ef72d",
  pageTypeSlug: "temper-skill",
  slug: "everlasting-magic",
  title: "Everlasting Magic",
  key: "everlasting-magic",
  baseName: "Everlasting Magic",
  description: '"Increases the duration of your Mages Guild abilities by 2 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_063.dds",
  esoSkillId: 45602,
  isMorph: false,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-mages-guild",
  skillType: "passive",
  subcategoryId: "guild-mages-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
