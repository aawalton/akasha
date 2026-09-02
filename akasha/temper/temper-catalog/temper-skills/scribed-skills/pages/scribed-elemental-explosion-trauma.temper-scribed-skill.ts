import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionTrauma = {
  id: "01a05fd2-7c40-7bac-ab33-b0bee38b985f",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-trauma",
  title: "Traumatic Explosion",
  key: "scribed-elemental-explosion-trauma",
  baseName: "Elemental Explosion",
  description: "Afflicts enemies with 2004 Healing Absorption for 3 seconds.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 222313,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "trauma",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
