import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTrampleStun = {
  id: "01a05fd2-7c50-73b5-af0e-51d41f8c21e4",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-trample-stun",
  title: "Dazing Trample",
  key: "scribed-trample-stun",
  baseName: "Trample",
  description: "Deals 1438 Physical Damage to all enemies and stuns them for 3 seconds.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 220545,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "stun",
  grimoireId: "trample",
} as const satisfies TemperScribedSkill
