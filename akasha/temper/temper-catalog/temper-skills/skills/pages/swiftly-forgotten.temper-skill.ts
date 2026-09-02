import type { TemperSkill } from "../temper-skill.page-type.ts"

export const swiftlyForgotten = {
  id: "01a05fd1-d25c-7672-8f13-1f73a893bc6c",
  pageTypeSlug: "temper-skill",
  slug: "swiftly-forgotten",
  title: "Swiftly Forgotten",
  key: "swiftly-forgotten",
  baseName: "Swiftly Forgotten",
  description:
    '"Bounty is decreased by 115 after 3 minutes.\\nHeat is decreased by 64 after 3 seconds."',
  icon: "/esoui/art/icons/ability_thievesguild_passive_005.dds",
  esoSkillId: 76457,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-thieves-guild",
  skillType: "passive",
  subcategoryId: "guild-thieves-guild",
  status: "unsupported",
} as const satisfies TemperSkill
