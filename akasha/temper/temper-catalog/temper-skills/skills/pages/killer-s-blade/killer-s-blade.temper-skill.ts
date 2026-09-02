import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const killerSBlade = {
  id: "01a05fd0-dcd1-7dc7-a26d-e437fe8b45d2",
  pageTypeSlug: "temper-skill",
  slug: "killer-s-blade",
  title: "Killer's Blade",
  key: "killer-s-blade",
  baseName: "Assassin's Blade",
  description:
    '"Thrust a caustic blade with lethal precision to stab an enemy, dealing |cffffff4038|r Disease Damage. Deals up to |cffffff400|r% more damage to enemies with less than |cffffff50|r% Health.\\n\\nHeals you for |cffffff7547|r if the enemy dies within |cffffff2|r seconds of being struck."',
  icon: "/esoui/art/icons/ability_nightblade_017_a.dds",
  esoSkillId: 34843,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
