import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceShadowCloak = {
  id: "01a05fd2-1e85-7862-9735-47350386db8e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-shadow-cloak",
  title: "Vengeance Shadow Cloak",
  key: "vengeance-shadow-cloak",
  baseName: "Vengeance Shadow Cloak",
  description:
    '"Cloak yourself in shadow to become invisible for |cffffff3|r seconds while immediately healing yourself for |cffffff10710|r Health."',
  icon: "/esoui/art/icons/ability_nightblade_004.dds",
  esoSkillId: 237640,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-shadow",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-shadow",
} as const satisfies TemperSkill
