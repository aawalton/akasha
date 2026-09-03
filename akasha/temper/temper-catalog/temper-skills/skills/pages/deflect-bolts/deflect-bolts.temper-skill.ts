import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deflectBolts = {
  id: "019e6226-00e3-72e9-a75e-070995b32016",
  pageTypeSlug: "temper-skill",
  slug: "deflect-bolts",
  title: "Deflect Bolts",
  key: "deflect-bolts",
  baseName: "Deflect Bolts",
  description:
    '"Increases the amount of damage you can block from projectiles and ranged attacks by 14%."',
  icon: "/esoui/art/icons/ability_templar_027.dds",
  esoSkillId: 45472,
  isMorph: false,
  learnedLevel: 46,
  lineRankNeeded: 46,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "passive",
  subcategoryId: "weapon-one-hand-and-shield",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
