import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkTalons = {
  id: "019e6f53-a07f-7496-99f8-e01b32569b04",
  pageTypeSlug: "temper-skill",
  slug: "dark-talons",
  title: "Dark Talons",
  key: "dark-talons",
  baseName: "Dark Talons",
  description:
    '"Call forth talons from the ground, dealing |cffffff6400|r Flame Damage to enemies near you and immobilizing them for |cffffff4|r seconds. \\n\\nAn ally near the talons can activate the Ignite synergy, dealing |cffffff10328|r Flame Damage to all enemies held within them."',
  icon: "/esoui/art/icons/ability_dragonknight_010.dds",
  esoSkillId: 20245,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
