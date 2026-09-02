import type { TemperSkill } from "../temper-skill.page-type.ts"

export const locksmith = {
  id: "01a05fd1-2deb-7bac-bc2a-0c5e181ed4dc",
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
