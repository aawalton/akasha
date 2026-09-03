import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lifeMender = {
  id: "019e624a-12ce-7aea-8f0f-eaa93ab70109",
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
