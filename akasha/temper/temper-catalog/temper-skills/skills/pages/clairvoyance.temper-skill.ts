import type { TemperSkill } from "../temper-skill.page-type.ts"

export const clairvoyance = {
  id: "01a05fd0-4394-7349-a4bc-847f93e909fb",
  pageTypeSlug: "temper-skill",
  slug: "clairvoyance",
  title: "Clairvoyance",
  key: "clairvoyance",
  baseName: "Clairvoyance",
  description: '"Reduces the cost of your Psijic Order abilities by 15%."',
  icon: "/esoui/art/icons/ability_psijic_008.dds",
  esoSkillId: 103811,
  isMorph: false,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-psijic-order",
  skillType: "passive",
  subcategoryId: "guild-psijic-order",
  status: "unsupported",
} as const satisfies TemperSkill
