import type { TemperSkill } from "../temper-skill.page-type.ts"

export const lastGasp = {
  id: "01a05fd0-dcd3-7eab-9595-88d85602b817",
  pageTypeSlug: "temper-skill",
  slug: "last-gasp",
  title: "Last Gasp",
  key: "last-gasp",
  baseName: "Last Gasp",
  description: '"Increase your Max Health by 2412."',
  icon: "/esoui/art/icons/passive_necromancer_008.dds",
  esoSkillId: 116272,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "passive",
  subcategoryId: "necromancer-bone-tyrant",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
