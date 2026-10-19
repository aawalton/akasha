import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const jumpPoints = {
  id: "01a15653-0325-7360-8ea9-c3c725f4e4d2",
  type: "page-type/number-property",
  slug: "jump-points",
  propertySlug: "jump-points",
  definition: "the points at which a champion star's bonus steps up",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's jump points are the points `GetChampionSkillJumpPoints` answers for it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Jump points are written by hand, since no capture reads them from the game.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-19T22:40:43.300Z",
  updatedAt: "2026-10-19T22:40:43.300Z",
} as const satisfies NumberProperty
