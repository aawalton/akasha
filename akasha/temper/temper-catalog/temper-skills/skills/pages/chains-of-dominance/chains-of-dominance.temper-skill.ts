import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const chainsOfDominance = {
  id: "019e6245-a617-7ee4-8a1f-e9c455c45600",
  pageTypeSlug: "temper-skill",
  slug: "chains-of-dominance",
  title: "Chains of Dominance",
  key: "chains-of-dominance",
  baseName: "Chains of Flame",
  description:
    '"Lash out with a chain bound in Draconic runes, pulling an enemy to you. The enchanted metal deals 5240 Flame Damage, applies the Burning status effect, and taunts them for 15 seconds if they are not already taunted. If the target cannot be pulled, you restore the ability\'s Magicka cost.\\n\\nThis attack cannot be dodged or reflected.\\n\\nAlso inflicts Major Cowardice on the enemy, reducing Weapon and Spell Damage by 430 for 15 seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_005_a.dds",
  esoSkillId: 20496,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
