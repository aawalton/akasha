import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dragonfireBreath = {
  id: "019e6f53-a0e6-7f97-8dbb-977c423edba3",
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
