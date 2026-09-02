import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTravelingKnifeStun = {
  id: "01a05fd2-7c52-7fdd-996b-09e8d8d443d9",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-traveling-knife-stun",
  title: "Dazing Knife",
  key: "scribed-traveling-knife-stun",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Physical Damage to an enemy and stuns them and enemies between you and them for 3 seconds on return.",
  icon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  esoSkillId: 217872,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "stun",
  grimoireId: "traveling-knife",
} as const satisfies TemperScribedSkill
