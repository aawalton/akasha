import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceStrife = {
  id: "01a05fd2-1e8a-7e51-8f40-bb9933239c4c",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-strife",
  title: "Vengeance Strife",
  key: "vengeance-strife",
  baseName: "Vengeance Strife",
  description:
    '"Steal an enemy\'s life force, dealing |cffffff5565|r Magic Damage and healing you or a nearby ally for |cffffff8033|r Health."',
  icon: "/esoui/art/icons/ability_nightblade_012.dds",
  esoSkillId: 237709,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-siphoning",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-siphoning",
} as const satisfies TemperSkill
