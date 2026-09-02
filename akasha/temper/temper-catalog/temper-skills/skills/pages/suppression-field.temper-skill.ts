import type { TemperSkill } from "../temper-skill.page-type.ts"

export const suppressionField = {
  id: "01a05fd1-d255-74da-8e07-37b415c31b16",
  pageTypeSlug: "temper-skill",
  slug: "suppression-field",
  title: "Suppression Field",
  key: "suppression-field",
  baseName: "Negate Magic",
  description:
    '"Create a globe of magic suppression for 12 seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\\n\\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned.\\n\\nThe globe also damages enemies for 1038 Magic Damage every 1 second."',
  icon: "/esoui/art/icons/ability_sorcerer_crushing_monsoon.dds",
  esoSkillId: 29861,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-dark-magic",
  skillType: "ultimate",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
