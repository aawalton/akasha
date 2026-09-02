import type { TemperSkill } from "../temper-skill.page-type.ts"

export const siegeWeaponShield40229 = {
  id: "01a05fd1-7cc4-7939-9e06-bc8ab8f86fe7",
  pageTypeSlug: "temper-skill",
  slug: "siege-weapon-shield-40229",
  title: "Siege Weapon Shield",
  key: "siege-weapon-shield-40229",
  baseName: "Siege Shield",
  description:
    '"Create a protective sphere over your location that reduces damage taken from siege weapons by |cffffff50|r% for you and nearby allies.\\n\\nThe sphere also protects you and your allies\' siege weapons, reducing damage from enemy siege weapons by |cffffff75|r%."',
  icon: "/esoui/art/icons/ability_ava_004_b.dds",
  esoSkillId: 40229,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
