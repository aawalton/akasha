import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTramplePhysicalDamage = {
  id: "019e6471-15d9-7bef-9f70-63075b632837",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-trample-physical-damage",
  title: "Sundering Trample",
  key: "scribed-trample-physical-damage",
  baseName: "Trample",
  description: "Deals 2876 Physical Damage to all enemies.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 220541,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "physical-damage",
  grimoireId: "trample",
} as const satisfies TemperScribedSkill
