import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyImmobilize = {
  id: "019e6471-15e8-7ffd-b9dc-cb84443835ba",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-immobilize",
  title: "Binding Contingency",
  key: "scribed-ulfsilds-contingency-immobilize",
  baseName: "Ulfsild's Contingency",
  description:
    "Deals 958 Magic Damage to enemies and immobilizes them for 4 seconds. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "immobilize",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
