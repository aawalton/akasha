import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const absorptionField28348 = {
  id: "019e6f53-9e86-7665-8aee-f5a8e0be9f8f",
  type: "page-type/temper-skill",
  slug: "absorption-field-28348",
  title: "Absorption Field",
  key: "absorption-field-28348",
  baseName: "Negate Magic",
  description:
    "Create a globe of magic suppression for |cffffff12|r seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\n\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned.\n\nThe globe also heals you and your allies for |cffffff3265|r Health every |cffffff1|r second.",
  icon: "/esoui/art/icons/ability_sorcerer_rushing_winds.dds",
  esoSkillId: 28348,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 7,
  createdAt: "2026-05-28T16:03:31.590Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12 seconds (Constant)",
    "<<2>> = 0.0446504 MaxStat + 0.469231 MaxPower - 0.121725 (Ultimate, ratio = 10.51, Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
