import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const effectiveFiveHourResetsAt = {
  id: "01a0916c-9192-72e8-ab13-1e5f620a30ed",
  type: "page-type/computed-property",
  slug: "effective-five-hour-resets-at",
  propertySlug: "effective-five-hour-resets-at",
  definition:
    "when a five-hour window resets for a model account that can spend its seven-day window",
  holds: "instant",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account that has spent its seven-day window has no five-hour reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The reset is worked out from the effective seven-day usage rather than the stated percent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose subscription is withdrawn has no five-hour reset.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No code outside the five-hour reset module works out whether a reset is held back.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-11T17:03:26.610Z",
  updatedAt: "2026-10-19T18:42:17.907Z",
} as const satisfies ComputedProperty
