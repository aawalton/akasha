import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const efficientPurge = {
  id: "01a05fd0-8e14-7071-9095-4d74aab7c793",
  pageTypeSlug: "temper-skill",
  slug: "efficient-purge",
  title: "Efficient Purge",
  key: "efficient-purge",
  baseName: "Purge",
  description: '"Cleanse yourself and your group, removing up to 3 negative effects immediately."',
  icon: "/esoui/art/icons/ability_ava_005_a.dds",
  esoSkillId: 46636,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
