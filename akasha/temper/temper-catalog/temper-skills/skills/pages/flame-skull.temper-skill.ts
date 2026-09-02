import type { TemperSkill } from "../temper-skill.page-type.ts"

export const flameSkull = {
  id: "01a05fd0-dc8c-739c-8772-f763346efd2d",
  pageTypeSlug: "temper-skill",
  slug: "flame-skull",
  title: "Flame Skull",
  key: "flame-skull",
  baseName: "Flame Skull",
  description:
    '"Lob an explosive skull at an enemy, dealing |cffffff7269|r Flame Damage.\\n\\nEvery third cast of this ability deals |cffffff50|r% increased damage and creates a corpse near the enemy."',
  icon: "/esoui/art/icons/ability_necromancer_001.dds",
  esoSkillId: 114108,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
