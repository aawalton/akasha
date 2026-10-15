import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodAltar = {
  id: "019e6f53-9f41-7855-b0a3-3a9a03186221",
  type: "page-type/temper-skill",
  slug: "blood-altar",
  title: "Blood Altar",
  key: "blood-altar",
  baseName: "Blood Altar",
  description:
    "Sacrifice your life essence to conjure a fountain of blood to apply Minor Lifesteal to enemies in the area, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging them.\n\nAllies in the area can activate the Blood Funnel synergy, healing for |cffffff40|r% of their Max Health.",
  icon: "/esoui/art/icons/ability_undaunted_001.dds",
  esoSkillId: 39489,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 113,
  createdAt: "2026-05-28T16:03:31.777Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Lifesteal (Constant)",
    "<<2>> = 600 (Constant)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = Blood Funnel (Constant)",
    "<<5>> = 40% (Constant)",
  ],
} as const satisfies TemperSkill
