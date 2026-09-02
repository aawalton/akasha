import type { TemperSkill } from "../temper-skill.page-type.ts"

export const cleanse = {
  id: "01a05fd0-4396-77ac-b3fd-8d5ecd152531",
  pageTypeSlug: "temper-skill",
  slug: "cleanse",
  title: "Cleanse",
  key: "cleanse",
  baseName: "Purge",
  description:
    '"Cleanse yourself and your group, removing 3 negative effects immediately.  \\n\\nFor every negative effect removed, the target is healed for 5% of their Max Health."',
  icon: "/esoui/art/icons/ability_ava_005_b.dds",
  esoSkillId: 46644,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
