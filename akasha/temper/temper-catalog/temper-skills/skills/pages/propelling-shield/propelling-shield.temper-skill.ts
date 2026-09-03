import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const propellingShield = {
  id: "019e6251-4cd8-7124-b08a-706c69c62474",
  pageTypeSlug: "temper-skill",
  slug: "propelling-shield",
  title: "Propelling Shield",
  key: "propelling-shield",
  baseName: "Siege Shield",
  description:
    '"Create a protective sphere over your location that reduces damage taken from siege weapons by 50% for you and nearby allies.\\n\\nAlso increases the range of abilities with a range greater than 28 meters by 7 meters. Does not affect Leap, Move Position, and Pull abilities."',
  icon: "/esoui/art/icons/ability_ava_004_a.dds",
  esoSkillId: 46670,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
