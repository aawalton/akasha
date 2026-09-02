import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const absorptionField28348 = {
  id: "01a05fd0-433d-7284-b812-bdf7e83e027b",
  pageTypeSlug: "temper-skill",
  slug: "absorption-field-28348",
  title: "Absorption Field",
  key: "absorption-field-28348",
  baseName: "Negate Magic",
  description:
    '"Create a globe of magic suppression for |cffffff12|r seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\\n\\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned.\\n\\nThe globe also heals you and your allies for |cffffff3265|r Health every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_sorcerer_rushing_winds.dds",
  esoSkillId: 28348,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "ultimate",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
