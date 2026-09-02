import type { TemperSkill } from "../temper-skill.page-type.ts"

export const elementalDrain39095 = {
  id: "01a05fd0-8e16-7c17-b67f-44778e0579ba",
  pageTypeSlug: "temper-skill",
  slug: "elemental-drain-39095",
  title: "Elemental Drain",
  key: "elemental-drain-39095",
  baseName: "Weakness to Elements",
  description:
    '"Send the elements to sap an enemy\'s defenses and afflict them with Major Breach for |cffffff1|r minute, reducing their Physical and Spell Resistance by |cffffff5948|r.\\n\\nAlso applies Minor Magickasteal to the enemy for |cffffff1|r minute, causing you and your allies to restore |cffffff168|r Magicka every |cffffff1|r second when damaging them."',
  icon: "/esoui/art/icons/ability_destructionstaff_011a.dds",
  esoSkillId: 39095,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
