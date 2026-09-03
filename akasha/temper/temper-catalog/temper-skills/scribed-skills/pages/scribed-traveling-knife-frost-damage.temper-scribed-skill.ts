import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTravelingKnifeFrostDamage = {
  id: "019e6471-15dd-784f-a6a0-1e0f49004b9a",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-traveling-knife-frost-damage",
  title: "Chilling Knife",
  key: "scribed-traveling-knife-frost-damage",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Magic Damage to an enemy and 1393 Frost Damage to enemies between you and them on return.",
  icon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  esoSkillId: 50007007,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "frost-damage",
  grimoireId: "traveling-knife",
} as const satisfies TemperScribedSkill
