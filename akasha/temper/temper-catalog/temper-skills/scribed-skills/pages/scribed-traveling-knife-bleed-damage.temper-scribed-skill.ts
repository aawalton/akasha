import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTravelingKnifeBleedDamage = {
  id: "019e6471-15dc-7979-a73d-48cc885b2f1c",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-traveling-knife-bleed-damage",
  title: "Bloody Knife",
  key: "scribed-traveling-knife-bleed-damage",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Physical Damage to an enemy and 1393 Bleed Damage to enemies between you and them on return.",
  icon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  esoSkillId: 217359,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "bleed-damage",
  grimoireId: "traveling-knife",
} as const satisfies TemperScribedSkill
