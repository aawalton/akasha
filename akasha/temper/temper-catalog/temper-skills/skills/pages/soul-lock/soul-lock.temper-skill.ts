import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulLock = {
  id: "019e6251-4cec-7c8d-9e53-bf0d04a3d3bc",
  pageTypeSlug: "temper-skill",
  slug: "soul-lock",
  title: "Soul Lock",
  key: "soul-lock",
  baseName: "Soul Lock",
  description: '"Killing an enemy has a 10% chance of automatically filling an empty Soul Gem."',
  icon: "/esoui/art/icons/ability_sorcerer_043.dds",
  esoSkillId: 45580,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-soul-magic",
  skillType: "passive",
  subcategoryId: "world-soul-magic",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
