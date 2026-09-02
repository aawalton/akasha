import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const acceleratedGrowth = {
  id: "01a05fd0-433e-713c-9bda-f110d9f7ccbc",
  pageTypeSlug: "temper-skill",
  slug: "accelerated-growth",
  title: "Accelerated Growth",
  key: "accelerated-growth",
  baseName: "Accelerated Growth",
  description:
    '"When you heal yourself or an ally under 40% Health with a Green Balance ability you gain Major Mending, increasing your healing done by 16% for 4 seconds."',
  icon: "/esoui/art/icons/passive_warden_008.dds",
  esoSkillId: 85883,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-green-balance",
  skillType: "passive",
  subcategoryId: "warden-green-balance",
  status: "unsupported",
} as const satisfies TemperSkill
