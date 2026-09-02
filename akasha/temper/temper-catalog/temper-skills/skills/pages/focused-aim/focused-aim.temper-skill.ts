import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const focusedAim = {
  id: "01a05fd0-dc90-77e4-9298-9cee0f241169",
  pageTypeSlug: "temper-skill",
  slug: "focused-aim",
  title: "Focused Aim",
  key: "focused-aim",
  baseName: "Snipe",
  description:
    '"Plant a masterfully aimed arrow in an enemy\'s vital spot, dealing 2404 Physical Damage and applying the Sundered status effect."',
  icon: "/esoui/art/icons/ability_bow_001_b.dds",
  esoSkillId: 40907,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
