import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bindingJavelin = {
  id: "019e6245-a5f6-71d3-97e2-21139673915e",
  pageTypeSlug: "temper-skill",
  slug: "binding-javelin",
  title: "Binding Javelin",
  key: "binding-javelin",
  baseName: "Piercing Javelin",
  description:
    '"Hurl your spear at an enemy with godlike strength, dealing 1393 Physical Damage and stunning them for 4 seconds.\\n\\nThis ability ignores the enemy\'s Resistances and cannot be blocked."',
  icon: "/esoui/art/icons/ability_templar_light_spear.dds",
  esoSkillId: 26992,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
