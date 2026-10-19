import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const effectiveSevenDayUsage = {
  id: "01a07659-1796-79b2-9c53-f9a3eb5ed248",
  type: "page-type/computed-property",
  slug: "effective-seven-day-usage",
  propertySlug: "effective-seven-day-usage",
  definition: "the part of its seven-day window a model account can not spend",
  holds: "number",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose subscription is withdrawn has spent the whole of the window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account with no percent is worked out as no reading rather than as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A percent stated as text is taken as the number that percent spells.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No code outside the effective seven-day usage works out the seven-day spend.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-06T10:52:25.366Z",
  updatedAt: "2026-10-19T18:41:57.957Z",
} as const satisfies ComputedProperty
