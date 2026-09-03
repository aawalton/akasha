import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cleanse40234 = {
  id: "019e6f53-9ff6-7253-97ca-2eade8f16c1d",
  pageTypeSlug: "temper-skill",
  slug: "cleanse-40234",
  title: "Cleanse",
  key: "cleanse-40234",
  baseName: "Purge",
  description:
    '"Cleanse yourself and your group, removing |cffffff3|r negative effects immediately.  \\n\\nFor every negative effect removed, the target is healed for |cffffff5|r% of their Max Health."',
  icon: "/esoui/art/icons/ability_ava_005_b.dds",
  esoSkillId: 40234,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
