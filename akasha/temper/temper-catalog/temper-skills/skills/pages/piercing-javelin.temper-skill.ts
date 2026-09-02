import type { TemperSkill } from "../temper-skill.page-type.ts"

export const piercingJavelin = {
  id: "01a05fd1-2e13-7027-b8a6-ba8b2f2a35a2",
  pageTypeSlug: "temper-skill",
  slug: "piercing-javelin",
  title: "Piercing Javelin",
  key: "piercing-javelin",
  baseName: "Piercing Javelin",
  description:
    '"Hurl your spear at an enemy with godlike strength, dealing |cffffff4846|r Magic Damage and knocking them back |cffffff8|r meters.\\n\\nThis ability ignores the enemy\'s Resistances and cannot be blocked."',
  icon: "/esoui/art/icons/ability_templar_returning_spear.dds",
  esoSkillId: 26158,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
