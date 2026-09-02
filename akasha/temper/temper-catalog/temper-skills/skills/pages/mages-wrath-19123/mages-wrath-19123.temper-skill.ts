import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magesWrath19123 = {
  id: "01a05fd1-2df1-7696-ba4b-a7cd8fa2de9b",
  pageTypeSlug: "temper-skill",
  slug: "mages-wrath-19123",
  title: "Mages' Wrath",
  key: "mages-wrath-19123",
  baseName: "Mages' Fury",
  description:
    '"Call down lightning to strike an enemy, dealing |cffffff3028|r Shock Damage.\\n\\nIf the enemy falls to or below |cffffff20|r% Health within |cffffff2|r seconds of being struck, an explosion deals an additional |cffffff11735|r Shock Damage to them and all nearby enemies."',
  icon: "/esoui/art/icons/ability_sorcerer_mage_wraith.dds",
  esoSkillId: 19123,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
