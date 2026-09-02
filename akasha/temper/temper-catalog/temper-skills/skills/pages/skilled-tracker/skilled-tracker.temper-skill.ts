import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const skilledTracker = {
  id: "01a05fd1-7cca-70d4-9b32-aba773fd297d",
  pageTypeSlug: "temper-skill",
  slug: "skilled-tracker",
  title: "Skilled Tracker",
  key: "skilled-tracker",
  baseName: "Skilled Tracker",
  description:
    '"Your Fighters Guild abilities deal an additional 10% damage. This bonus doubles against player Vampires and Werewolves."',
  icon: "/esoui/art/icons/ability_armor_007.dds",
  esoSkillId: 40393,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "passive",
  subcategoryId: "guild-fighters-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
