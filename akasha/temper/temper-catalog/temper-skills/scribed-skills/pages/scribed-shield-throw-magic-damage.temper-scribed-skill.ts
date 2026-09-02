import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowMagicDamage = {
  id: "01a05fd2-7c44-74b7-8026-b9a92810c397",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-magic-damage",
  title: "Magical Throw",
  key: "scribed-shield-throw-magic-damage",
  baseName: "Shield Throw",
  description: "Deals 2091 Magic Damage to an enemy.",
  icon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  esoSkillId: 217808,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "magic-damage",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
