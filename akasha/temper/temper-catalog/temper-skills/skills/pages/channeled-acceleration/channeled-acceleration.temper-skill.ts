import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const channeledAcceleration = {
  id: "019e6238-c2a3-7b61-933a-559b1ea8b7ab",
  pageTypeSlug: "temper-skill",
  slug: "channeled-acceleration",
  title: "Channeled Acceleration",
  key: "channeled-acceleration",
  baseName: "Accelerate",
  description:
    '"Bend time and space around you to gain Major Expedition for 12 seconds and Minor Force for 1 minute, increasing your Movement Speed by 30% and Critical Damage by 10%."',
  icon: "/esoui/art/icons/ability_psijic_005_a.dds",
  esoSkillId: 40103706,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
