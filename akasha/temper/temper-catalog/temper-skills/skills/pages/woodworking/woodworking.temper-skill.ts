import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const woodworking = {
  id: "019e6224-ccb7-7563-bc0e-3334e3b15a30",
  pageTypeSlug: "temper-skill",
  slug: "woodworking",
  title: "Woodworking",
  key: "woodworking",
  baseName: "Woodworking",
  description: '"Allows the use of Sanded Ruby Ash."',
  icon: "/esoui/art/icons/ability_tradecraft_003.dds",
  esoSkillId: 70046,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 10,
  skillLineId: "craft-woodworking",
  skillType: "passive",
  subcategoryId: "craft-woodworking",
} as const satisfies TemperSkill
