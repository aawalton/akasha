import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const curativeCurse = {
  id: "019e6245-a62d-7a45-946b-34db598fc25a",
  pageTypeSlug: "temper-skill",
  slug: "curative-curse",
  title: "Curative Curse",
  key: "curative-curse",
  baseName: "Curative Curse",
  description: '"While you have a negative effect on you, your healing done is increased by 12%."',
  icon: "/esoui/art/icons/passive_necromancer_009.dds",
  esoSkillId: 116287,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-living-death",
  skillType: "passive",
  subcategoryId: "necromancer-living-death",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
