import type { TemperSkill } from "../temper-skill.page-type.ts"

export const magesFury = {
  id: "01a05fd1-2df0-7355-adc2-28f04ada2a8a",
  pageTypeSlug: "temper-skill",
  slug: "mages-fury",
  title: "Mages' Fury",
  key: "mages-fury",
  baseName: "Mages' Fury",
  description:
    '"Call down lightning to strike an enemy, dealing |cffffff3028|r Shock Damage.\\n\\nIf the enemy falls to or below |cffffff20|r% Health within |cffffff2|r seconds of being struck, an explosion deals an additional |cffffff11105|r Shock Damage to them and |cffffff2560|r Shock Damage to other enemies nearby."',
  icon: "/esoui/art/icons/ability_sorcerer_mage_fury.dds",
  esoSkillId: 18718,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
