import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceLavaWhip = {
  id: "019e6f53-a92d-7aa7-83a7-9f3d74edd06f",
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
