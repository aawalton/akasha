import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTrampleKnockback = {
  id: "01a05fd2-7c4f-7a7d-9809-53d7cd726842",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-trample-knockback",
  title: "Repelling Trample",
  key: "scribed-trample-knockback",
  baseName: "Trample",
  description: "Deals 1438 Physical Damage to all enemies and knocks them back 8 meters.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 217663,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "knockback",
  grimoireId: "trample",
} as const satisfies TemperScribedSkill
