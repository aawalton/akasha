import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSmashStun = {
  id: "01a05fd2-7c47-7f07-b7bd-e32615d7b56f",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-smash-stun",
  title: "Dazing Smash",
  key: "scribed-smash-stun",
  baseName: "Smash",
  description:
    "Deals 1001 Physical Damage to enemies and fears them for 3 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 219972,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "stun",
  grimoireId: "smash",
} as const satisfies TemperScribedSkill
