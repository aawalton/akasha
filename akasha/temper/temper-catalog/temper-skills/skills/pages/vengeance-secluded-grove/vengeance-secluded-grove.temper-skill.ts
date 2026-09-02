import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSecludedGrove = {
  id: "01a05fd2-1e85-7c23-8a17-7aa630b4fecd",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-secluded-grove",
  title: "Vengeance Secluded Grove",
  key: "vengeance-secluded-grove",
  baseName: "Vengeance Secluded Grove",
  description:
    '"Swell a healing forest at the target location, healing up to 3 of you and your allies for |cffffff42840|r Health over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_warden_012.dds",
  esoSkillId: 238074,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-green-balance",
  skillType: "ultimate",
  subcategoryId: "vengeance-warden-green-balance",
} as const satisfies TemperSkill
