import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const martialTraining = {
  id: "01a05fd1-2df7-7a43-a27c-a89b5ca451b7",
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
