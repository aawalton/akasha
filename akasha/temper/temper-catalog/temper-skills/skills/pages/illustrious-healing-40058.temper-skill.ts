import type { TemperSkill } from "../temper-skill.page-type.ts"

export const illustriousHealing40058 = {
  id: "01a05fd0-dcbe-737b-b642-6fc7084aed24",
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
