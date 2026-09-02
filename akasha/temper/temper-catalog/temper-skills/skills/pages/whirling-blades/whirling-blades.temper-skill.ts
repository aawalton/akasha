import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const whirlingBlades = {
  id: "01a05fd2-1e97-75f2-be2d-115cc1e438f4",
  pageTypeSlug: "temper-skill",
  slug: "whirling-blades",
  title: "Whirling Blades",
  key: "whirling-blades",
  baseName: "Whirlwind",
  description:
    '"Launch yourself into a lethal spin, dealing 1799 Physical Damage to nearby enemies. Deals up to 100% more damage to enemies with less than 50% Health."',
  icon: "/esoui/art/icons/ability_dualwield_005_a.dds",
  esoSkillId: 40731,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
