import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTrampleTrauma = {
  id: "01a05fd2-7c50-7eb4-aac1-a9aef8727189",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-trample-trauma",
  title: "Traumatic Trample",
  key: "scribed-trample-trauma",
  baseName: "Trample",
  description: "Afflicts all enemies with 1438 Healing Absorption for 3 seconds.",
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
  focusScriptId: "trauma",
  grimoireId: "trample",
} as const satisfies TemperScribedSkill
