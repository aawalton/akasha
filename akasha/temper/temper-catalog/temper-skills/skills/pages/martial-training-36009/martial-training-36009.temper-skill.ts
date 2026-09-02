import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const martialTraining36009 = {
  id: "01a05fd1-2df7-78e6-bf33-dd3e1b0adf31",
  pageTypeSlug: "temper-skill",
  slug: "martial-training-36009",
  title: "Martial Training",
  key: "martial-training-36009",
  baseName: "Martial Training",
  description:
    '"Reduces the cost of your weapon abilities by |cffffff2|r%.\\n\\nReduces the effectiveness of snares applied to you by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_templar_002.dds",
  esoSkillId: 36009,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "racial-redguard-skills",
  skillType: "passive",
  subcategoryId: "racial-redguard-skills",
} as const satisfies TemperSkill
