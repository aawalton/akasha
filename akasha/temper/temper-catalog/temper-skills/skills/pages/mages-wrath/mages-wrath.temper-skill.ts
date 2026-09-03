import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magesWrath = {
  id: "019e6245-a6c4-7105-bb25-54086c8316b8",
  pageTypeSlug: "temper-skill",
  slug: "mages-wrath",
  title: "Mages' Wrath",
  key: "mages-wrath",
  baseName: "Mages' Fury",
  description:
    '"Call down lightning to strike an enemy, dealing 871 Shock Damage.\\n\\nIf the enemy falls to or below 20% Health within 2 seconds of being struck, an explosion deals an additional 3195 Shock Damage to them and all nearby enemies."',
  icon: "/esoui/art/icons/ability_sorcerer_mage_wraith.dds",
  esoSkillId: 30331,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
