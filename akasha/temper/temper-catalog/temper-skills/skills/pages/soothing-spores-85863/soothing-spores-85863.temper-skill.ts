import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soothingSpores85863 = {
  id: "019e6f53-a75a-7cb2-b546-87d1081a8d3f",
  pageTypeSlug: "temper-skill",
  slug: "soothing-spores-85863",
  title: "Soothing Spores",
  key: "soothing-spores-85863",
  baseName: "Fungal Growth",
  description:
    '"Seed a large area of mushrooms in front of you, healing you and your allies for |cffffff8489|r Health.\\n\\nHeals for |cffffff15|r% more on allies that are within |cffffff8|r meters of you."',
  icon: "/esoui/art/icons/ability_warden_008_a.dds",
  esoSkillId: 85863,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
