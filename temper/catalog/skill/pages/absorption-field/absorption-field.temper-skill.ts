import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const absorptionField = {
  id: "019e6245-a5e2-75f1-b123-d65494466840",
  type: "page-type/temper-skill",
  slug: "absorption-field",
  title: "Absorption Field",
  key: "absorption-field",
  baseName: "Negate Magic",
  description:
    "Create a globe of magic suppression for 12 seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\n\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned.\n\nThe globe also heals you and your allies for 1038 Health every 1 second.",
  icon: "/esoui/art/icons/ability_sorcerer_rushing_winds.dds",
  esoSkillId: 29881,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 6,
  createdAt: "2026-05-26T03:13:12.162Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12 seconds (Constant)",
    "<<2>> = 0.0461487 MaxStat + 0.484482 MaxPower - 0.42246 (Ultimate, ratio = 10.50, Heal, AOE, Direct, 1s tick, R2 = 0.999999)",
    "<<3>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
