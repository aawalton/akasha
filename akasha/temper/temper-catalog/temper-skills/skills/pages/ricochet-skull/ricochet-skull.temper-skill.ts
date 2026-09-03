import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ricochetSkull = {
  id: "019e6245-a713-7291-9a60-a670b09c0638",
  pageTypeSlug: "temper-skill",
  slug: "ricochet-skull",
  title: "Ricochet Skull",
  key: "ricochet-skull",
  baseName: "Flame Skull",
  description:
    '"Lob an explosive skull at an enemy, dealing 2160 Flame Damage.\\n\\nEvery third cast of this ability deals 50% increased damage, creates a corpse near the initial enemy, and will bounce up to 2 times to other nearby enemies."',
  icon: "/esoui/art/icons/ability_necromancer_001_b.dds",
  esoSkillId: 40117637,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
