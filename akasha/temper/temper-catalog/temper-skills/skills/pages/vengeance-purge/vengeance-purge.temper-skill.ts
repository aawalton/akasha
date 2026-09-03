import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePurge = {
  id: "019e6f53-a958-77db-b601-92147af93217",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-purge",
  title: "Vengeance Purge",
  key: "vengeance-purge",
  baseName: "Vengeance Purge",
  description:
    '"Cleanse yourself and up to 2 group members, removing up to |cffffff3|r negative effects immediately.\\n\\nCan only be cast when you have a negative effect active on yourself."',
  icon: "/esoui/art/icons/ability_ava_005.dds",
  esoSkillId: 244715,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-support",
  skillType: "active",
  subcategoryId: "vengeance-alliance-war-support",
} as const satisfies TemperSkill
