import type { TemperSkill } from "../temper-skill.page-type.ts"

export const scalesOfPitilessJustice = {
  id: "01a05fd1-7cb1-73c0-9570-79e4c3371075",
  pageTypeSlug: "temper-skill",
  slug: "scales-of-pitiless-justice",
  title: "Scales of Pitiless Justice",
  key: "scales-of-pitiless-justice",
  baseName: "Scales of Pitiless Justice",
  description: '"Bounty and Heat resulting from a witnessed Murder or Assault is reduced by 50%."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_002.dds",
  esoSkillId: 79865,
  isMorph: false,
  learnedLevel: 11,
  lineRankNeeded: 11,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-dark-brotherhood",
  skillType: "passive",
  subcategoryId: "guild-dark-brotherhood",
  status: "unsupported",
} as const satisfies TemperSkill
