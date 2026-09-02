import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ricochetSkull = {
  id: "01a05fd1-7c9a-7ba8-bd23-485bfe15d082",
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
