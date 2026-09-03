import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceTeleportStrike = {
  id: "019e6f53-a99d-7650-8aeb-c9bc47906618",
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
