import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const incapacitatingStrike36508 = {
  id: "019e6f53-a36c-7bea-95fa-431cf54c5563",
  pageTypeSlug: "temper-skill",
  slug: "incapacitating-strike-36508",
  title: "Incapacitating Strike",
  key: "incapacitating-strike-36508",
  baseName: "Death Stroke",
  description:
    '"Ravage an enemy with a swift strike, dealing |cffffff13350|r Disease Damage and causing them to take |cffffff20|r% more damage from your attacks for |cffffff8|r seconds.\\n\\nIf cast with |cffffff126|r or more Ultimate, you instead deal |cffffff14685|r Disease Damage, stun the enemy for |cffffff3|r seconds, and increase the duration of the damage taken effect to |cffffff12|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_007_a.dds",
  esoSkillId: 36508,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "ultimate",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
