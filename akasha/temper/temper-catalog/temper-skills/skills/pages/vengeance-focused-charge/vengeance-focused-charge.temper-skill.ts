import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFocusedCharge = {
  id: "019e6f53-a910-7c8e-a2f1-e172dd1aa376",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-focused-charge",
  title: "Vengeance Focused Charge",
  key: "vengeance-focused-charge",
  baseName: "Vengeance Focused Charge",
  description:
    '"Charge with your divine lance to impale an enemy to deal |cffffff6678|r Magic Damage."',
  icon: "/esoui/art/icons/ability_templar_focused_charge.dds",
  esoSkillId: 237883,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-aedric-spear",
  skillType: "active",
  subcategoryId: "vengeance-templar-aedric-spear",
} as const satisfies TemperSkill
