import type { TemperSkill } from "../temper-skill.page-type.ts"

export const deflectBolts = {
  id: "01a05fd0-8e06-701a-adb6-41e336b57d44",
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
} as const satisfies TemperSkill
