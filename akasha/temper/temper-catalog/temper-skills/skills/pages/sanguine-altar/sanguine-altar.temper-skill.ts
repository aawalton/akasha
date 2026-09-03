import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sanguineAltar = {
  id: "019e6238-c306-7a6a-8ee4-6bbf73ecb212",
  pageTypeSlug: "temper-skill",
  slug: "sanguine-altar",
  title: "Sanguine Altar",
  key: "sanguine-altar",
  baseName: "Blood Altar",
  description:
    '"Sacrifice your life essence to conjure a fountain of blood to apply Minor Lifesteal to enemies in the area, healing you and your allies for 600 Health every 1 second when damaging them.\\n\\nAllies in the area can activate the Blood Funnel synergy, healing for 40% of their Max Health."',
  icon: "/esoui/art/icons/ability_undaunted_001_b.dds",
  esoSkillId: 43266,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
