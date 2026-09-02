import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerBash = {
  id: "01a05fd1-2e16-78a2-a4b8-603ad39c2291",
  pageTypeSlug: "temper-skill",
  slug: "power-bash",
  title: "Power Bash",
  key: "power-bash",
  baseName: "Power Bash",
  description:
    '"Strike an enemy full-force with your shield, dealing |cffffff8203|r Physical Damage. \\n\\nThis ability\'s damage is considered Bash damage and interrupts the enemy if they are casting."',
  icon: "/esoui/art/icons/ability_1handed_005.dds",
  esoSkillId: 28365,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
