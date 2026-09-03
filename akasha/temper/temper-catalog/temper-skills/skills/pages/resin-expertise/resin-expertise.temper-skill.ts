import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resinExpertise = {
  id: "019e6224-ccab-7fcd-8779-a90561505b59",
  pageTypeSlug: "temper-skill",
  slug: "resin-expertise",
  title: "Resin Expertise",
  key: "resin-expertise",
  baseName: "Resin Expertise",
  description: '"More than doubles the chances to improve items with resins."',
  icon: "/esoui/art/icons/ability_tradecraft_001.dds",
  esoSkillId: 48177,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-woodworking",
  skillType: "passive",
  subcategoryId: "craft-woodworking",
} as const satisfies TemperSkill
