import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulLock = {
  id: "01a05fd1-7cd2-7204-b81a-23ce1efc2c7c",
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
