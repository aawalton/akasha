import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionPhysicalDamage = {
  id: "01a05fd2-7c3f-7605-8606-9918eb16936a",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-physical-damage",
  title: "Sundering Explosion",
  key: "scribed-elemental-explosion-physical-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Physical Damage to enemies.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 229857,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "physical-damage",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
