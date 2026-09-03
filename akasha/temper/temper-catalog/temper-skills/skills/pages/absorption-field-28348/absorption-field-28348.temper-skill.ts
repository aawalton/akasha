import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const absorptionField28348 = {
  id: "019e6f53-9e86-7665-8aee-f5a8e0be9f8f",
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
