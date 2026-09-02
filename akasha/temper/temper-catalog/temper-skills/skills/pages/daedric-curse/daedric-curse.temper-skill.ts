import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const daedricCurse = {
  id: "01a05fd0-8df5-71d3-b591-e4e6172b8685",
  pageTypeSlug: "temper-skill",
  slug: "daedric-curse",
  title: "Daedric Curse",
  key: "daedric-curse",
  baseName: "Daedric Curse",
  description:
    '"Curse an enemy with a destructive rune, dealing |cffffff10668|r Magic Damage to the target and all other nearby enemies after |cffffff6|r seconds.\\n\\nYou can have only one Daedric Curse active at a time."',
  icon: "/esoui/art/icons/ability_sorcerer_daedric_curse.dds",
  esoSkillId: 24326,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
