import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceTeleportStrike = {
  id: "01a05fd2-1e8b-7f20-9fc7-98fa7d730f16",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-teleport-strike",
  title: "Vengeance Teleport Strike",
  key: "vengeance-teleport-strike",
  baseName: "Vengeance Teleport Strike",
  description:
    '"Flash through the shadows and ambush an enemy, dealing |cffffff7680|r Magic Damage."',
  icon: "/esoui/art/icons/ability_nightblade_008.dds",
  esoSkillId: 237601,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-assassination",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-assassination",
} as const satisfies TemperSkill
