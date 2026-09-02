import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceSnipe = {
  id: "01a05fd2-1e88-7514-83d7-85d375a454ad",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-snipe",
  title: "Vengeance Snipe",
  key: "vengeance-snipe",
  baseName: "Vengeance Snipe",
  description:
    '"Plant a masterfully aimed arrow in an enemy\'s vital spot, dealing |cffffff11519|r Physical Damage."',
  icon: "/esoui/art/icons/ability_bow_001.dds",
  esoSkillId: 241255,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-bow",
  skillType: "active",
  subcategoryId: "vengeance-weapon-bow",
} as const satisfies TemperSkill
