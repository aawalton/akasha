import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceShadowCloak = {
  id: "019e6f53-a97f-71bb-99dd-7d6b4904ee07",
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
