import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionDispel = {
  id: "01a05fd2-7c3e-79d5-a6e8-9cb0c81b938f",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-dispel",
  title: "Dispelling Explosion",
  key: "scribed-elemental-explosion-dispel",
  baseName: "Elemental Explosion",
  description: "Removes up to 3 enemy area effect abilities.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 217237,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "dispel",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
