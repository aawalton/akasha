import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTrampleMagicDamage = {
  id: "019e6471-15d8-7c0e-902b-942f9adc9ad6",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-trample-magic-damage",
  title: "Magical Trample",
  key: "scribed-trample-magic-damage",
  baseName: "Trample",
  description: "Deals 2876 Magic Damage to all enemies.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 220542,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "magic-damage",
  grimoireId: "trample",
} as const satisfies TemperScribedSkill
