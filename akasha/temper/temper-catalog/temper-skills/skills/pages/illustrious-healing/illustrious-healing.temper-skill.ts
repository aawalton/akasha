import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const illustriousHealing = {
  id: "01a05fd0-dcbd-72d3-ae3d-db2a7c291bab",
  pageTypeSlug: "temper-skill",
  slug: "illustrious-healing",
  title: "Illustrious Healing",
  key: "illustrious-healing",
  baseName: "Grand Healing",
  description:
    '"Summon restoring spirits with your staff, healing you and your allies in the target area for 5486 Health over 15 seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_004b.dds",
  esoSkillId: 41255,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
