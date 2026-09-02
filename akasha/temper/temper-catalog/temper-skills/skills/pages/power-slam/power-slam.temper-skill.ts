import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerSlam = {
  id: "01a05fd1-2e18-7218-800d-066ee6f30f42",
  pageTypeSlug: "temper-skill",
  slug: "power-slam",
  title: "Power Slam",
  key: "power-slam",
  baseName: "Power Bash",
  description:
    '"Strike an enemy full-force with your shield, dealing 2399 Physical Damage.\\n\\nWhile slotted, blocking any attack grants you Resentment, which reduces the cost of your next Power Slam cast within 10 seconds by 50%.\\n\\nThis ability\'s damage is considered Bash damage and interrupts the enemy if they are casting."',
  icon: "/esoui/art/icons/ability_1handed_005_a.dds",
  esoSkillId: 41459,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
