import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulSummons = {
  id: "01a05fd1-7cd5-7dfb-8cf5-6df6c92ec7d8",
  pageTypeSlug: "temper-skill",
  slug: "soul-summons",
  title: "Soul Summons",
  key: "soul-summons",
  baseName: "Soul Summons",
  description: '"Allows you to revive once every 1 hour without spending a Soul Gem."',
  icon: "/esoui/art/icons/ability_sorcerer_047.dds",
  esoSkillId: 45590,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-soul-magic",
  skillType: "passive",
  subcategoryId: "world-soul-magic",
  status: "unsupported",
} as const satisfies TemperSkill
