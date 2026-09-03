import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const daedricPrey = {
  id: "019e6245-a631-7591-8437-f953d9f9e4da",
  pageTypeSlug: "temper-skill",
  slug: "daedric-prey",
  title: "Daedric Prey",
  key: "daedric-prey",
  baseName: "Daedric Curse",
  description:
    '"Curse an enemy with a destructive rune, dealing 2904 Magic Damage to the target and all other nearby enemies after 6 seconds.\\n\\nWhile the curse is active, your Daedric Summoning pets prioritize the target and deal an additional 50% damage to them.\\n\\nYou can have only one Daedric Prey active at a time."',
  icon: "/esoui/art/icons/ability_sorcerer_explosive_curse.dds",
  esoSkillId: 30511,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
