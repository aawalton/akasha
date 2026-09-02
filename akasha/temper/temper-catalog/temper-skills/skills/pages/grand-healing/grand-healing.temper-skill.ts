import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const grandHealing = {
  id: "01a05fd0-dca0-7654-a93b-75ccf9477be1",
  pageTypeSlug: "temper-skill",
  slug: "grand-healing",
  title: "Grand Healing",
  key: "grand-healing",
  baseName: "Grand Healing",
  description:
    '"Summon restoring spirits with your staff, healing you and your allies in the target area for |cffffff14597|r Health over |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_004.dds",
  esoSkillId: 28385,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
