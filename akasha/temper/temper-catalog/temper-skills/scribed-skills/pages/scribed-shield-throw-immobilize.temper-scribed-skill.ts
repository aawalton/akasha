import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowImmobilize = {
  id: "01a05fd2-7c44-7e91-ad7a-63d2800899cc",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-immobilize",
  title: "Binding Throw",
  key: "scribed-shield-throw-immobilize",
  baseName: "Shield Throw",
  description: "Deals 1045 Physical Damage to an enemy and immobilizes them for 3 seconds.",
  icon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  esoSkillId: 217061,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "immobilize",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
