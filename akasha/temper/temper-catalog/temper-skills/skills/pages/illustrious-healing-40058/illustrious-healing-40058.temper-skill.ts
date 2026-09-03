import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const illustriousHealing40058 = {
  id: "019e6f53-a352-78b8-b507-f05d8f90802a",
  pageTypeSlug: "temper-skill",
  slug: "illustrious-healing-40058",
  title: "Illustrious Healing",
  key: "illustrious-healing-40058",
  baseName: "Grand Healing",
  description:
    '"Summon restoring spirits with your staff, healing you and your allies in the target area for |cffffff21248|r Health over |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_004b.dds",
  esoSkillId: 40058,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
