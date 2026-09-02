import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const chainsOfFlame = {
  id: "01a05fd0-438d-7d58-bd01-57f41c350ae3",
  pageTypeSlug: "temper-skill",
  slug: "chains-of-flame",
  title: "Chains of Flame",
  key: "chains-of-flame",
  baseName: "Chains of Flame",
  description:
    '"Lash out with a flaming chain, pulling an enemy to you. The searing metal deals |cffffff4846|r Flame Damage, applies the Burning status effect, and taunts them for |cffffff15|r seconds if they are not already taunted.\\n\\nThis attack cannot be dodged or reflected.\\n\\nAlso inflicts Major Cowardice on the enemy, reducing Weapon and Spell Damage by |cffffff430|r for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_005.dds",
  esoSkillId: 20492,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
