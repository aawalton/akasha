import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const tailoring = {
  id: "01a05fd1-d25f-78d7-a74d-f4eeec30b9ef",
  pageTypeSlug: "temper-skill",
  slug: "tailoring",
  title: "Tailoring",
  key: "tailoring",
  baseName: "Tailoring",
  description: '"Allows the use of Ancestor Silk and Rubedo Leather."',
  icon: "/esoui/art/icons/ability_tradecraft_002.dds",
  esoSkillId: 70044,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 10,
  skillLineId: "craft-clothing",
  skillType: "passive",
  subcategoryId: "craft-clothing",
} as const satisfies TemperSkill
