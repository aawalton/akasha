import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceVeiledStrike = {
  id: "01a05fd2-1e8e-72bf-9b18-7fbb69b6d185",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-veiled-strike",
  title: "Vengeance Veiled Strike",
  key: "vengeance-veiled-strike",
  baseName: "Vengeance Veiled Strike",
  description: '"Slash an enemy, dealing |cffffff11130|r Magic Damage."',
  icon: "/esoui/art/icons/ability_nightblade_002.dds",
  esoSkillId: 237430,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-assassination",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-assassination",
} as const satisfies TemperSkill
