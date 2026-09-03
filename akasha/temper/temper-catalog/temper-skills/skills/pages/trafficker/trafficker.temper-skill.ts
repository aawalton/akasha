import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const trafficker = {
  id: "019e6251-4cf9-7505-bd13-cd37c6fe9348",
  pageTypeSlug: "temper-skill",
  slug: "trafficker",
  title: "Trafficker",
  key: "trafficker",
  baseName: "Trafficker",
  description: '"Increases the number of fence interactions you can use each day by 180%."',
  icon: "/esoui/art/icons/ability_legerdemain_salesman.dds",
  esoSkillId: 63810,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 4,
  skillLineId: "world-legerdemain",
  skillType: "passive",
  subcategoryId: "world-legerdemain",
} as const satisfies TemperSkill
