import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const killersBlade = {
  id: "019e6245-a6b7-7af8-a274-ae32fe0dc877",
  pageTypeSlug: "temper-skill",
  slug: "killers-blade",
  title: "Killer's Blade",
  key: "killers-blade",
  baseName: "Assassin's Blade",
  description:
    '"Thrust a caustic blade with lethal precision to stab an enemy, dealing 1161 Disease Damage. Deals up to 400% more damage to enemies with less than 50% Health.\\n\\nHeals you for 2399 if the enemy dies within 2 seconds of being struck."',
  icon: "/esoui/art/icons/ability_nightblade_017_a.dds",
  esoSkillId: 35590,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
