import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const martialTraining = {
  id: "019e624a-12d1-7e8f-818d-4fed83f345ae",
  pageTypeSlug: "temper-skill",
  slug: "martial-training",
  title: "Martial Training",
  key: "martial-training",
  baseName: "Martial Training",
  description:
    '"Reduces the cost of your weapon abilities by 8%.\\n\\nReduces the effectiveness of snares applied to you by 15%."',
  icon: "/esoui/art/icons/ability_templar_002.dds",
  esoSkillId: 45278,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-redguard-skills",
  skillType: "passive",
  subcategoryId: "racial-redguard-skills",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
