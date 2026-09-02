import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deathKnell = {
  id: "01a05fd0-8e01-720f-826e-b2dad0368af2",
  pageTypeSlug: "temper-skill",
  slug: "death-knell",
  title: "Death Knell",
  key: "death-knell",
  baseName: "Death Knell",
  description: '"Increases your Critical Strike Chance against enemies under 33% Health by 20%."',
  icon: "/esoui/art/icons/passive_necromancer_002.dds",
  esoSkillId: 116198,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-grave-lord",
  skillType: "passive",
  subcategoryId: "necromancer-grave-lord",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
