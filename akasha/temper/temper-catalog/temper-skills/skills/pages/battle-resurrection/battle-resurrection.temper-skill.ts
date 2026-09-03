import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const battleResurrection = {
  id: "019e6251-4c8a-7763-82ee-84773472435f",
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
