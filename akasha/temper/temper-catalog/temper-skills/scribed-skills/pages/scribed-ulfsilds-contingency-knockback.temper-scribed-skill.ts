import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyKnockback = {
  id: "01a05fd2-7c54-7c74-aad3-315ddb7ad3a8",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-knockback",
  title: "Repelling Contingency",
  key: "scribed-ulfsilds-contingency-knockback",
  baseName: "Ulfsild's Contingency",
  description:
    "Knocks enemies back 8 meters. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 240148,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "knockback",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
