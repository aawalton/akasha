import type { TemperSkill } from "../temper-skill.page-type.ts"

export const elementalSusceptibility = {
  id: "01a05fd0-8e18-73cc-8da5-a5b9e1b46bdd",
  pageTypeSlug: "temper-skill",
  slug: "elemental-susceptibility",
  title: "Elemental Susceptibility",
  key: "elemental-susceptibility",
  baseName: "Weakness to Elements",
  description:
    '"Send the elements to sap an enemy\'s defenses and afflict them with Major Breach for 30 seconds, reducing their Physical and Spell Resistance by 5948.\\n\\nEvery 7.5 seconds the enemy is afflicted with the Burning, Chilled, and Concussion status effect."',
  icon: "/esoui/art/icons/ability_destructionstaff_011b.dds",
  esoSkillId: 41556,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
