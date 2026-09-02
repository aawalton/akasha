import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const concentratedBarrier = {
  id: "01a05fd0-439e-7551-b16d-47883561f9c7",
  pageTypeSlug: "temper-skill",
  slug: "concentrated-barrier",
  title: "Concentrated Barrier",
  key: "concentrated-barrier",
  baseName: "Concentrated Barrier",
  description:
    '"While you have a Psijic Order ability slotted and are Bracing, you gain a damage shield that absorbs 5000 damage. \\n\\nThis damage shield recharges back to full strength after you spend 10 seconds not Bracing."',
  icon: "/esoui/art/icons/ability_psijic_010.dds",
  esoSkillId: 103964,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-psijic-order",
  skillType: "passive",
  subcategoryId: "guild-psijic-order",
  status: "unsupported",
} as const satisfies TemperSkill
