import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTravelingKnifePull = {
  id: "01a05fd2-7c52-7951-9cc2-54f63f9c793b",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-traveling-knife-pull",
  title: "Leashing Knife",
  key: "scribed-traveling-knife-pull",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Physical Damage to an enemy and pulls them and enemies between you and them to you on return.",
  icon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  esoSkillId: 232112,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "pull",
  grimoireId: "traveling-knife",
} as const satisfies TemperScribedSkill
