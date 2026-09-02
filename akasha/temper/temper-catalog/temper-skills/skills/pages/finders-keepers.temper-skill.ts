import type { TemperSkill } from "../temper-skill.page-type.ts"

export const findersKeepers = {
  id: "01a05fd0-dc8b-7393-8c50-21e34fe9eb00",
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
} as const satisfies TemperSkill
