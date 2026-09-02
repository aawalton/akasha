import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const daedricPrey24328 = {
  id: "01a05fd0-8df6-721f-a27c-1fa58bcf10d8",
  pageTypeSlug: "temper-skill",
  slug: "daedric-prey-24328",
  title: "Daedric Prey",
  key: "daedric-prey-24328",
  baseName: "Daedric Curse",
  description:
    '"Curse an enemy with a destructive rune, dealing |cffffff10668|r Magic Damage to the target and all other nearby enemies after |cffffff6|r seconds.\\n\\nWhile the curse is active, your Daedric Summoning pets prioritize the target and deal an additional |cffffff50|r% damage to them.\\n\\nYou can have only one Daedric Prey active at a time."',
  icon: "/esoui/art/icons/ability_sorcerer_explosive_curse.dds",
  esoSkillId: 24328,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
