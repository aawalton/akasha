import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const impale = {
  id: "01a05fd0-dcbf-7bc5-98c1-332cad337b03",
  pageTypeSlug: "temper-skill",
  slug: "impale",
  title: "Impale",
  key: "impale",
  baseName: "Assassin's Blade",
  description:
    '"Throw a magic blade with lethal precision to strike an enemy, dealing 1161 Magic Damage. Deals 330% more damage to enemies below 25% Health."',
  icon: "/esoui/art/icons/ability_nightblade_017_b.dds",
  esoSkillId: 35596,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
