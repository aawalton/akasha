import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyHealing = {
  id: "01a05fd2-7c53-7974-88c2-7cb6b5105e02",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-healing",
  title: "Healing Contingency",
  key: "scribed-ulfsilds-contingency-healing",
  baseName: "Ulfsild's Contingency",
  description:
    "Heals you and your allies for 2876 Health. Beneficial Signature and Affix scripts apply to you and your allies.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 240149,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "healing",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
