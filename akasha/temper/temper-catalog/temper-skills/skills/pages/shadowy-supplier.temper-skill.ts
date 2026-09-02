import type { TemperSkill } from "../temper-skill.page-type.ts"

export const shadowySupplier = {
  id: "01a05fd1-7cba-73f6-b70b-ae696436833e",
  pageTypeSlug: "temper-skill",
  slug: "shadowy-supplier",
  title: "Shadowy Supplier",
  key: "shadowy-supplier",
  baseName: "Shadowy Supplier",
  description:
    '"A contact from the Brotherhood provides beneficial items once per day. This contact is located in Outlaw Refuges, the Gold Coast Dark Brotherhood Sanctuary, and the Hew\'s Bane Thieves Den."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_003.dds",
  esoSkillId: 77396,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-dark-brotherhood",
  skillType: "passive",
  subcategoryId: "guild-dark-brotherhood",
  status: "unsupported",
} as const satisfies TemperSkill
