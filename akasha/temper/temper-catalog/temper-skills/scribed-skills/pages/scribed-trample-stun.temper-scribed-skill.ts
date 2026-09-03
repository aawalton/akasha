import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTrampleStun = {
  id: "019e6471-15da-7b44-8ea3-aa025185089e",
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
