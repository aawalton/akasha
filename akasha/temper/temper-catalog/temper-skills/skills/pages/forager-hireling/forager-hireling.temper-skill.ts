import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const foragerHireling = {
  id: "019e6224-cc95-7e6b-bec6-bbb383e0f8f0",
  pageTypeSlug: "temper-skill",
  slug: "forager-hireling",
  title: "Forager Hireling",
  key: "forager-hireling",
  baseName: "Forager Hireling",
  description:
    '"A hireling will send you even more provisioning ingredients every day. You have a greater chance at better quality ingredients."',
  icon: "/esoui/art/icons/ability_provisioner_007.dds",
  esoSkillId: 44641,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 28,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-provisioning",
  skillType: "passive",
  subcategoryId: "craft-provisioning",
} as const satisfies TemperSkill
