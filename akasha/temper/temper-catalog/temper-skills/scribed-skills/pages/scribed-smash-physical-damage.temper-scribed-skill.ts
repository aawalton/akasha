import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSmashPhysicalDamage = {
  id: "01a05fd2-7c47-7b59-aeb9-1cfc038d576f",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-smash-physical-damage",
  title: "Sundering Smash",
  key: "scribed-smash-physical-damage",
  baseName: "Smash",
  description:
    "Deals 2004 Physical Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  esoSkillId: 217178,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "physical-damage",
  grimoireId: "smash",
} as const satisfies TemperScribedSkill
