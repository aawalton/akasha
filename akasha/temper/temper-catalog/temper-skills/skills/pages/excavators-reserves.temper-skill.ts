import type { TemperSkill } from "../temper-skill.page-type.ts"

export const excavatorsReserves = {
  id: "01a05fd0-8e29-739a-9135-611e7b83b261",
  pageTypeSlug: "temper-skill",
  slug: "excavators-reserves",
  title: "Excavator's Reserves",
  key: "excavators-reserves",
  baseName: "Excavator's Reserves",
  description:
    '"Further increases the amount of time you have available when excavating a dig site."',
  icon: "/esoui/art/icons/u26_ability_digging_05.dds",
  esoSkillId: 139911,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
