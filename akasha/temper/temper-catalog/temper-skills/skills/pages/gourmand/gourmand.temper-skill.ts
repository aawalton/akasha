import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const gourmand = {
  id: "019e6224-cc97-7030-bd4c-ce81fe02eade",
  pageTypeSlug: "temper-skill",
  slug: "gourmand",
  title: "Gourmand",
  key: "gourmand",
  baseName: "Gourmand",
  description: '"Adds 20 minutes to the duration of any eaten food."',
  icon: "/esoui/art/icons/ability_provisioner_004.dds",
  esoSkillId: 44610,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-provisioning",
  skillType: "passive",
  subcategoryId: "craft-provisioning",
} as const satisfies TemperSkill
