import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceOverload = {
  id: "01a05fd2-1e7a-7cbd-9550-64b3b929e54e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-overload",
  title: "Vengeance Overload",
  key: "vengeance-overload",
  baseName: "Vengeance Overload",
  description:
    '"Charge your fists with the power of the storm and deal |cffffff12521|r Shock Damage to your enemy.\\n\\nThis ability does not drain all available Ultimate."',
  icon: "/esoui/art/icons/ability_sorcerer_overload.dds",
  esoSkillId: 237998,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-storm-calling",
  skillType: "ultimate",
  subcategoryId: "vengeance-sorcerer-storm-calling",
} as const satisfies TemperSkill
