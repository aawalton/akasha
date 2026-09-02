import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingSprings = {
  id: "01a05fd0-dcab-70c1-b9a8-ab3a10d7a70d",
  pageTypeSlug: "temper-skill",
  slug: "healing-springs",
  title: "Healing Springs",
  key: "healing-springs",
  baseName: "Grand Healing",
  description:
    '"Summon restoring spirits with your staff, healing you and your allies in the target area for 4642 Health over 10 seconds. \\n\\nIncreases your Magicka Recovery by 15 for each target affected, stacking up to 20 times."',
  icon: "/esoui/art/icons/ability_restorationstaff_004a.dds",
  esoSkillId: 41265,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
