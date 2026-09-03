import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const weaknessToElements = {
  id: "019e6f53-a9dd-7aaa-804e-25e64ca348eb",
  pageTypeSlug: "temper-skill",
  slug: "weakness-to-elements",
  title: "Weakness to Elements",
  key: "weakness-to-elements",
  baseName: "Weakness to Elements",
  description:
    '"Send the elements to sap an enemy\'s defenses and afflict them with Major Breach for |cffffff30|r seconds, reducing their Physical and Spell Resistance by |cffffff5948|r."',
  icon: "/esoui/art/icons/ability_destructionstaff_011.dds",
  esoSkillId: 29173,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
