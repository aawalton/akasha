import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const timelyEscape = {
  id: "01a05fd1-d26a-7a59-a1ef-4ef97603dce5",
  pageTypeSlug: "temper-skill",
  slug: "timely-escape",
  title: "Timely Escape",
  key: "timely-escape",
  baseName: "Timely Escape",
  description:
    '"When you have Bounty and are in combat, you have a chance to spot a \\"Footpad\\" in a town with a Refuge. Interacting with the Footpad will transport the player safely into the nearest Refuge."',
  icon: "/esoui/art/icons/ability_thievesguild_passive_004.dds",
  esoSkillId: 76452,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-thieves-guild",
  skillType: "passive",
  subcategoryId: "guild-thieves-guild",
  status: "unsupported",
} as const satisfies TemperSkill
