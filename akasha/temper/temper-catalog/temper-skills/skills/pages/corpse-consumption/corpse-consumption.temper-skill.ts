import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const corpseConsumption = {
  id: "01a05fd0-8de7-743b-b286-a10f56121d20",
  pageTypeSlug: "temper-skill",
  slug: "corpse-consumption",
  title: "Corpse Consumption",
  key: "corpse-consumption",
  baseName: "Corpse Consumption",
  description:
    '"When you consume a corpse, you generate 10 Ultimate. This effect can occur once every 16 seconds."',
  icon: "/esoui/art/icons/passive_necromancer_011.dds",
  esoSkillId: 116285,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-living-death",
  skillType: "passive",
  subcategoryId: "necromancer-living-death",
  status: "unsupported",
} as const satisfies TemperSkill
