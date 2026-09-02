import type { TemperSkill } from "../temper-skill.page-type.ts"

export const dragonfireBreath = {
  id: "01a05fd0-8e0f-7622-9b75-1447bda25625",
  pageTypeSlug: "temper-skill",
  slug: "dragonfire-breath",
  title: "Dragonfire Breath",
  key: "dragonfire-breath",
  baseName: "Dragonfire Breath",
  description:
    '"Exhale a blast of draconic fire in front of you, dealing |cffffff6400|r Flame Damage and an additional |cffffff9515|r Flame Damage over |cffffff10|r seconds to enemies in your path."',
  icon: "/esoui/art/icons/ability_dragonknight_004.dds",
  esoSkillId: 20917,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
