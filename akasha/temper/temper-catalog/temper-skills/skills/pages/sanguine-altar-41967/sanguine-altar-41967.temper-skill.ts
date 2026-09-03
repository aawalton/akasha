import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sanguineAltar41967 = {
  id: "019e6f53-a6aa-7ce6-afdd-f99c20521c7f",
  pageTypeSlug: "temper-skill",
  slug: "sanguine-altar-41967",
  title: "Sanguine Altar",
  key: "sanguine-altar-41967",
  baseName: "Blood Altar",
  description:
    '"Sacrifice your life essence to conjure a fountain of blood to apply Minor Lifesteal to enemies in the area, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging them.\\n\\nAllies in the area can activate the Blood Funnel synergy, healing for |cffffff40|r% of their Max Health."',
  icon: "/esoui/art/icons/ability_undaunted_001_b.dds",
  esoSkillId: 41967,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
