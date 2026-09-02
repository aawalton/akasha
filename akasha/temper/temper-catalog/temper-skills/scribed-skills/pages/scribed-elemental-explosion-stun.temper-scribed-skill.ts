import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionStun = {
  id: "01a05fd2-7c40-7345-94ec-b0a87f76d921",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-stun",
  title: "Dazing Explosion",
  key: "scribed-elemental-explosion-stun",
  baseName: "Elemental Explosion",
  description: "Stuns enemies for 5 seconds.",
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
  focusScriptId: "stun",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
