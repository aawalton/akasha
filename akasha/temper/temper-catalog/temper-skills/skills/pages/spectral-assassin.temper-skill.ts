import type { TemperSkill } from "../temper-skill.page-type.ts"

export const spectralAssassin = {
  id: "01a05fd1-7cd7-71cb-8c84-b2abfe4d7173",
  pageTypeSlug: "temper-skill",
  slug: "spectral-assassin",
  title: "Spectral Assassin",
  key: "spectral-assassin",
  baseName: "Spectral Assassin",
  description:
    '"15% chance to shroud you when using the Blade of Woe, shielding you from being witnessed and receiving a Bounty."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_006.dds",
  esoSkillId: 77401,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-dark-brotherhood",
  skillType: "passive",
  subcategoryId: "guild-dark-brotherhood",
  status: "unsupported",
} as const satisfies TemperSkill
