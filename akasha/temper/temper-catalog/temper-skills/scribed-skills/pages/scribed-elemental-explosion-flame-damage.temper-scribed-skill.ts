import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionFlameDamage = {
  id: "01a05fd2-7c3e-792b-a0c4-fa871ecf5571",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-flame-damage",
  title: "Fiery Explosion",
  key: "scribed-elemental-explosion-flame-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Flame Damage to enemies.",
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
  focusScriptId: "flame-damage",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
