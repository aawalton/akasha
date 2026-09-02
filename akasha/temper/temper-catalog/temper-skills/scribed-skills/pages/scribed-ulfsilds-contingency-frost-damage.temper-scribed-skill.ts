import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyFrostDamage = {
  id: "01a05fd2-7c53-7e8c-8201-74f48f0e88aa",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-frost-damage",
  title: "Chilling Contingency",
  key: "scribed-ulfsilds-contingency-frost-damage",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 1916 Frost Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 222678,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "frost-damage",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
