import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionKnockback = {
  id: "019e6471-15a6-790d-b568-6f6a40c84b90",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-knockback",
  title: "Repelling Explosion",
  key: "scribed-elemental-explosion-knockback",
  baseName: "Elemental Explosion",
  description: "Knocks enemies back 10 meters.",
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
  focusScriptId: "knockback",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
