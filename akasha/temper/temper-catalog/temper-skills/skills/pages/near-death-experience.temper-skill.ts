import type { TemperSkill } from "../temper-skill.page-type.ts"

export const nearDeathExperience = {
  id: "01a05fd1-2e06-7b90-9087-ff16e592524e",
  pageTypeSlug: "temper-skill",
  slug: "near-death-experience",
  title: "Near-Death Experience",
  key: "near-death-experience",
  baseName: "Near-Death Experience",
  description:
    '"While you have a Living Death ability slotted, your Critical Strike Chance with all healing abilities is increased by up to 12% in proportion to the severity of the target\'s wounds."',
  icon: "/esoui/art/icons/passive_necromancer_010.dds",
  esoSkillId: 116275,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-living-death",
  skillType: "passive",
  subcategoryId: "necromancer-living-death",
  status: "unsupported",
} as const satisfies TemperSkill
