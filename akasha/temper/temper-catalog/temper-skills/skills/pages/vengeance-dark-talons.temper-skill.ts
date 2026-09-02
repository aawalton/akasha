import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceDarkTalons = {
  id: "01a05fd1-d296-7875-8f3b-b7a4d9f2f117",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-dark-talons",
  title: "Vengeance Dark Talons",
  key: "vengeance-dark-talons",
  baseName: "Vengeance Dark Talons",
  description:
    '"Call forth talons from the ground, dealing |cffffff8820|r Flame Damage to up to 3 enemies near you and immobilizing them for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_010.dds",
  esoSkillId: 237636,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-draconic-power",
} as const satisfies TemperSkill
