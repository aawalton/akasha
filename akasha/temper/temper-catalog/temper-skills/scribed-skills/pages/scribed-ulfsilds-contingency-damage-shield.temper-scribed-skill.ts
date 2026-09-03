import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedUlfsildsContingencyDamageShield = {
  id: "019e6471-15e5-7491-b86f-978f1f230426",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-ulfsilds-contingency-damage-shield",
  title: "Warding Contingency",
  key: "scribed-ulfsilds-contingency-damage-shield",
  baseName: "Ulfsild's Contingency",
  description:
    "Grants a damage shield to you and your allies that absorbs 4090 damage for 6 seconds, scaling off the higher of your Max Health or Magicka and capped at 55% of your Max Health. Beneficial Signature and Affix scripts apply to you or an ally.",
  icon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  esoSkillId: 240150,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "damage-shield",
  grimoireId: "ulfsilds-contingency",
} as const satisfies TemperScribedSkill
