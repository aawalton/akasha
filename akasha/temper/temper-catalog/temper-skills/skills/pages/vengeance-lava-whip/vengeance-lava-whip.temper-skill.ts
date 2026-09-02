import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceLavaWhip = {
  id: "01a05fd1-d2ae-7f77-9004-45814405babe",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-lava-whip",
  title: "Vengeance Lava Whip",
  key: "vengeance-lava-whip",
  baseName: "Vengeance Lava Whip",
  description: '"Lash an enemy with flame, dealing |cffffff11130|r Flame Damage."',
  icon: "/esoui/art/icons/ability_dragonknight_001.dds",
  esoSkillId: 237606,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-ardent-flame",
} as const satisfies TemperSkill
