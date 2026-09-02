import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSiegeShield = {
  id: "01a05fd2-1e87-7d2a-9c99-92502629ae2d",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-siege-shield",
  title: "Vengeance Siege Shield",
  key: "vengeance-siege-shield",
  baseName: "Vengeance Siege Shield",
  description:
    '"Create a protective sphere after a 1 second delay that reduces damage taken from siege weapons by |cffffff50|r% to up to 3 of you and nearby allies for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_ava_004.dds",
  esoSkillId: 244688,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-support",
  skillType: "active",
  subcategoryId: "vengeance-alliance-war-support",
} as const satisfies TemperSkill
