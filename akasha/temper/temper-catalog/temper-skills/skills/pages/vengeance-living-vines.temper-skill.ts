import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceLivingVines = {
  id: "01a05fd2-1e74-75ef-8701-0d9c8adc8ce9",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-living-vines",
  title: "Vengeance Living Vines",
  key: "vengeance-living-vines",
  baseName: "Vengeance Living Vines",
  description:
    '"Grow vines to embrace you or an ally and heal them for |cffffff24096|r Health over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_warden_010.dds",
  esoSkillId: 238065,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-green-balance",
  skillType: "active",
  subcategoryId: "vengeance-warden-green-balance",
} as const satisfies TemperSkill
