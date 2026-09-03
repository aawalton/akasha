import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const explosiveCharge22161 = {
  id: "019e6f53-a1d0-7849-81b7-4674bd7a3a10",
  pageTypeSlug: "temper-skill",
  slug: "explosive-charge-22161",
  title: "Explosive Charge",
  key: "explosive-charge-22161",
  baseName: "Focused Charge",
  description:
    '"Charge with your divine lance to impale all enemies in the area, dealing |cffffff6611|r Magic Damage while taunting the first enemy hit to attack you for |cffffff15|r seconds. Any enemy hit that was casting is interrupted, set Off Balance, and stunned for |cffffff3|r seconds.\\n\\n You also gain Major Protection for |cffffff15|r seconds, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_templar_double_tipped_charge.dds",
  esoSkillId: 22161,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
