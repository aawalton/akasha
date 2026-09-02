import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalDrain = {
  id: "01a05fd0-8e16-70c3-ae19-b16fdb78bd92",
  pageTypeSlug: "temper-skill",
  slug: "elemental-drain",
  title: "Elemental Drain",
  key: "elemental-drain",
  baseName: "Weakness to Elements",
  description:
    '"Send the elements to sap an enemy\'s defenses and afflict them with Major Breach for 1 minute, reducing their Physical and Spell Resistance by 5948.\\n\\nAlso applies Minor Magickasteal to the enemy for 1 minute, causing you and your allies to restore 168 Magicka every 1 second when damaging them."',
  icon: "/esoui/art/icons/ability_destructionstaff_011a.dds",
  esoSkillId: 41567,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
