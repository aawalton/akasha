import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionShockDamage = {
  id: "01a05fd2-7c40-7224-8118-79464e34925f",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-shock-damage",
  title: "Shocking Explosion",
  key: "scribed-elemental-explosion-shock-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Shock Damage to enemies.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 217228,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "shock-damage",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
