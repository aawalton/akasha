import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingSprings40060 = {
  id: "019e6f53-a2e5-77e8-add6-a7c5afb7c1de",
  pageTypeSlug: "temper-skill",
  slug: "healing-springs-40060",
  title: "Healing Springs",
  key: "healing-springs-40060",
  baseName: "Grand Healing",
  description:
    '"Summon restoring spirits with your staff, healing you and your allies in the target area for |cffffff14608|r Health over |cffffff10|r seconds. \\n\\nIncreases your Magicka Recovery by |cffffff15|r for each target affected, stacking up to |cffffff20|r times."',
  icon: "/esoui/art/icons/ability_restorationstaff_004a.dds",
  esoSkillId: 40060,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
