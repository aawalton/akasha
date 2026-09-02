import type { TemperSkill } from "../temper-skill.page-type.ts"

export const lifeMender = {
  id: "01a05fd0-dcd7-70a6-afd1-e11343e32c4c",
  pageTypeSlug: "temper-skill",
  slug: "life-mender",
  title: "Life Mender",
  key: "life-mender",
  baseName: "Life Mender",
  description: '"Increases your healing done by 6%."',
  icon: "/esoui/art/icons/ability_templar_014.dds",
  esoSkillId: 45258,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-argonian-skills",
  skillType: "passive",
  subcategoryId: "racial-argonian-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
