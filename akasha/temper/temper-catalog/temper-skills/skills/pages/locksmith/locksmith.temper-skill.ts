import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const locksmith = {
  id: "019e6251-4ccf-761a-bbd5-ee040784e5f5",
  pageTypeSlug: "temper-skill",
  slug: "locksmith",
  title: "Locksmith",
  key: "locksmith",
  baseName: "Locksmith",
  description: '"Improves your chances of forcing locks by 70%."',
  icon: "/esoui/art/icons/ability_legerdemain_lockpick.dds",
  esoSkillId: 63814,
  isMorph: false,
  learnedLevel: 19,
  lineRankNeeded: 19,
  morphIndex: 0,
  rank: 4,
  skillLineId: "world-legerdemain",
  skillType: "passive",
  subcategoryId: "world-legerdemain",
} as const satisfies TemperSkill
