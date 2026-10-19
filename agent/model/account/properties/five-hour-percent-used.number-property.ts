import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const fiveHourPercentUsed = {
  id: "01a054d8-1d39-7bc9-bb38-636d44d7d1fb",
  type: "page-type/number-property",
  slug: "five-hour-percent-used",
  propertySlug: "five-hour-percent-used",
  definition: "the part of its five-hour window a model account spends",
  max: 100,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account that has spent its seven-day window has spent its five-hour window.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T22:44:04.537Z",
  updatedAt: "2026-10-19T18:37:20.406Z",
} as const satisfies NumberProperty
