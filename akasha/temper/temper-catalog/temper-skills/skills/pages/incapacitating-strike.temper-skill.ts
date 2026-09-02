import type { TemperSkill } from "../temper-skill.page-type.ts"

export const incapacitatingStrike = {
  id: "01a05fd0-dcc3-7ccd-99f0-3efa2b95a5bf",
  pageTypeSlug: "temper-skill",
  slug: "incapacitating-strike",
  title: "Incapacitating Strike",
  key: "incapacitating-strike",
  baseName: "Death Stroke",
  description:
    '"Ravage an enemy with a swift strike, dealing 3840 Disease Damage and causing them to take 20% more damage from your attacks for 8 seconds.\\n\\nIf cast with 120 or more Ultimate, you instead deal 4223 Disease Damage, stun the enemy for 3 seconds, and increase the duration of the damage taken effect to 12 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_007_a.dds",
  esoSkillId: 37532,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-assassination",
  skillType: "ultimate",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
