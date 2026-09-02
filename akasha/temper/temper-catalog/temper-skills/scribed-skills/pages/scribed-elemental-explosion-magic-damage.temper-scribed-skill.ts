import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionMagicDamage = {
  id: "01a05fd2-7c3f-78fe-8fab-be3886d3c0a1",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-magic-damage",
  title: "Magical Explosion",
  key: "scribed-elemental-explosion-magic-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Magic Damage to enemies.",
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
  focusScriptId: "magic-damage",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
