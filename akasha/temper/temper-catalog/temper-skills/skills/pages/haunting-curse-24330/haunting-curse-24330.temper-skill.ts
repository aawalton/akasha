import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hauntingCurse24330 = {
  id: "019e6f53-a2dc-7812-a273-4fd9c4a447ec",
  pageTypeSlug: "temper-skill",
  slug: "haunting-curse-24330",
  title: "Haunting Curse",
  key: "haunting-curse-24330",
  baseName: "Daedric Curse",
  description:
    '"Curse an enemy with a destructive rune, dealing |cffffff11020|r Magic Damage to the target and all other nearby enemies after |cffffff3.5|r seconds.\\n\\nThe curse will continue to haunt the enemy and explode a second time, dealing |cffffff11020|r Magic Damage to the target and all other nearby enemies after an additional |cffffff8.5|r seconds.\\n\\nYou can have only one Haunting Curse active at a time."',
  icon: "/esoui/art/icons/ability_sorcerer_velocious_curse.dds",
  esoSkillId: 24330,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
