import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const battleResurrection = {
  id: "01a05fd0-435d-758e-8951-b8a628a6fb2b",
  pageTypeSlug: "temper-skill",
  slug: "battle-resurrection",
  title: "Battle Resurrection",
  key: "battle-resurrection",
  baseName: "Battle Resurrection",
  description:
    '"Reduces the time it takes you to resurrect another player by 30% while you are in a PvP area."',
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 45625,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-support",
  skillType: "passive",
  subcategoryId: "alliance-war-support",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
