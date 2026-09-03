import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodAltar = {
  id: "019e6f53-9f41-7855-b0a3-3a9a03186221",
  pageTypeSlug: "temper-skill",
  slug: "blood-altar",
  title: "Blood Altar",
  key: "blood-altar",
  baseName: "Blood Altar",
  description:
    '"Sacrifice your life essence to conjure a fountain of blood to apply Minor Lifesteal to enemies in the area, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging them.\\n\\nAllies in the area can activate the Blood Funnel synergy, healing for |cffffff40|r% of their Max Health."',
  icon: "/esoui/art/icons/ability_undaunted_001.dds",
  esoSkillId: 39489,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
