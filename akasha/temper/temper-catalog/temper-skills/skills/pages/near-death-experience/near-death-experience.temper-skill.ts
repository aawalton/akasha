import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const nearDeathExperience = {
  id: "019e6245-a6d9-737b-9e20-cde41534d2b2",
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
  effects: "jsonl",
} as const satisfies TemperSkill
