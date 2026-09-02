import type { TemperSkill } from "../temper-skill.page-type.ts"

export const corpseConsumption116284 = {
  id: "01a05fd0-8de8-71c0-820d-e48c4f8d1de0",
  pageTypeSlug: "temper-skill",
  slug: "corpse-consumption-116284",
  title: "Corpse Consumption",
  key: "corpse-consumption-116284",
  baseName: "Corpse Consumption",
  description:
    '"When you consume a corpse, you generate |cffffff5|r Ultimate. This effect can occur once every |cffffff16|r seconds."',
  icon: "/esoui/art/icons/passive_necromancer_011.dds",
  esoSkillId: 116284,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "necromancer-living-death",
  skillType: "passive",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
