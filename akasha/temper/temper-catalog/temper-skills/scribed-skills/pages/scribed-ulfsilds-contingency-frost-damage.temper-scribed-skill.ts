import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyFrostDamage = {
  id: "019e6471-15e7-7302-814e-e56897a576db",
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
