import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const propellingShield40226 = {
  id: "01a05fd1-2e1e-725a-8968-dd69564480a5",
  pageTypeSlug: "temper-skill",
  slug: "propelling-shield-40226",
  title: "Propelling Shield",
  key: "propelling-shield-40226",
  baseName: "Siege Shield",
  description:
    '"Create a protective sphere over your location that reduces damage taken from siege weapons by |cffffff50|r% for you and nearby allies.\\n\\nAlso increases the range of abilities with a range greater than |cffffff28|r meters by |cffffff7|r meters. Does not affect Leap, Move Position, and Pull abilities."',
  icon: "/esoui/art/icons/ability_ava_004_a.dds",
  esoSkillId: 40226,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
