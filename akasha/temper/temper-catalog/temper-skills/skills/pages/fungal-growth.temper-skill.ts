import type { TemperSkill } from "../temper-skill.page-type.ts"

export const fungalGrowth = {
  id: "01a05fd0-dc99-7615-8242-04dee2eee186",
  pageTypeSlug: "temper-skill",
  slug: "fungal-growth",
  title: "Fungal Growth",
  key: "fungal-growth",
  baseName: "Fungal Growth",
  description:
    '"Seed a large area of mushrooms in front of you, healing you and your allies for |cffffff8220|r Health."',
  icon: "/esoui/art/icons/ability_warden_008.dds",
  esoSkillId: 85536,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
