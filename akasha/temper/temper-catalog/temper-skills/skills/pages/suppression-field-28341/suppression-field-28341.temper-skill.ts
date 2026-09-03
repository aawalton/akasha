import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const suppressionField28341 = {
  id: "019e6f53-a7f9-74bc-85a8-4e813bedd01a",
  pageTypeSlug: "temper-skill",
  slug: "suppression-field-28341",
  title: "Suppression Field",
  key: "suppression-field-28341",
  baseName: "Negate Magic",
  description:
    '"Create a globe of magic suppression for |cffffff12|r seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\\n\\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned.\\n\\nThe globe also damages enemies for |cffffff3609|r Magic Damage every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_sorcerer_crushing_monsoon.dds",
  esoSkillId: 28341,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "ultimate",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
