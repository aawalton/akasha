import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const findersKeepers = {
  id: "019e6238-c2bd-7899-b7db-89380eb3e789",
  pageTypeSlug: "temper-skill",
  slug: "finders-keepers",
  title: "Finders Keepers",
  key: "finders-keepers",
  baseName: "Finders Keepers",
  description:
    '"Thieves Troves are caches that are located all over Tamriel. They can only be opened by members of the Thieves Guild."',
  icon: "/esoui/art/icons/ability_thievesguild_passive_001.dds",
  esoSkillId: 74580,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-thieves-guild",
  skillType: "passive",
  subcategoryId: "guild-thieves-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
