import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedShieldThrowFrostDamage = {
  id: "01a05fd2-7c43-7118-a9f1-d6cd36ad2c63",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-shield-throw-frost-damage",
  title: "Chilling Throw",
  key: "scribed-shield-throw-frost-damage",
  baseName: "Shield Throw",
  description: "Deals 2091 Frost Damage to an enemy.",
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
  focusScriptId: "frost-damage",
  grimoireId: "shield-throw",
} as const satisfies TemperScribedSkill
