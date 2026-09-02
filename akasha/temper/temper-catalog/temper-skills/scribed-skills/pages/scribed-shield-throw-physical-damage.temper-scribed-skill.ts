import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowPhysicalDamage = {
  id: "01a05fd2-7c45-7f8e-a70f-84cbcfbfd052",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-physical-damage",
  title: "Sundering Throw",
  key: "scribed-shield-throw-physical-damage",
  baseName: "Shield Throw",
  description: "Deals 2091 Physical Damage to an enemy.",
  icon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  esoSkillId: 216973,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "physical-damage",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
