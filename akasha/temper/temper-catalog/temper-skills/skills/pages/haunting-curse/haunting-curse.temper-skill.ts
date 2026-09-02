import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hauntingCurse = {
  id: "01a05fd0-dca9-7fc6-9ef5-037d8e3610c4",
  pageTypeSlug: "temper-skill",
  slug: "haunting-curse",
  title: "Haunting Curse",
  key: "haunting-curse",
  baseName: "Daedric Curse",
  description:
    '"Curse an enemy with a destructive rune, dealing 2999 Magic Damage to the target and all other nearby enemies after 3.5 seconds.\\n\\nThe curse will continue to haunt the enemy and explode a second time, dealing 2999 Magic Damage to the target and all other nearby enemies after an additional 8.5 seconds.\\n\\nYou can have only one Haunting Curse active at a time."',
  icon: "/esoui/art/icons/ability_sorcerer_velocious_curse.dds",
  esoSkillId: 30523,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
