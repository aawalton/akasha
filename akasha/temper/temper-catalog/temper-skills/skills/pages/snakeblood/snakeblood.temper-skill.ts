import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const snakeblood = {
  id: "01a05fd1-7ccc-7055-9d96-7b37c09a507a",
  pageTypeSlug: "temper-skill",
  slug: "snakeblood",
  title: "Snakeblood",
  key: "snakeblood",
  baseName: "Snakeblood",
  description: '"Reduces duration of negative effects in potions by 100% when consumed."',
  icon: "/esoui/art/icons/ability_alchemy_005.dds",
  esoSkillId: 47834,
  isMorph: false,
  learnedLevel: 43,
  lineRankNeeded: 43,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-alchemy",
  skillType: "passive",
  subcategoryId: "craft-alchemy",
} as const satisfies TemperSkill
