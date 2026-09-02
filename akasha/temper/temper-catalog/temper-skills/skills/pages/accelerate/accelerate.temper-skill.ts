import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const accelerate = {
  id: "01a05fd0-433d-7361-9e7e-ac86463f3a7b",
  pageTypeSlug: "temper-skill",
  slug: "accelerate",
  title: "Accelerate",
  key: "accelerate",
  baseName: "Accelerate",
  description:
    '"Bend time and space around you to gain Major Expedition for |cffffff4|r seconds and Minor Force for |cffffff20|r seconds, increasing your Movement Speed by |cffffff30|r% and Critical Damage by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_psijic_005.dds",
  esoSkillId: 103503,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
