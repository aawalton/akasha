import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const absorptionField = {
  id: "019e6245-a5e2-75f1-b123-d65494466840",
  pageTypeSlug: "temper-skill",
  slug: "absorption-field",
  title: "Absorption Field",
  key: "absorption-field",
  baseName: "Negate Magic",
  description:
    '"Create a globe of magic suppression for 12 seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\\n\\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned.\\n\\nThe globe also heals you and your allies for 1038 Health every 1 second."',
  icon: "/esoui/art/icons/ability_sorcerer_rushing_winds.dds",
  esoSkillId: 29881,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "ultimate",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
