import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const schedule = {
  id: "01a05a3f-b42e-78d1-a00b-e982e5830c5c",
  type: "page-type/text-property",
  slug: "schedule",
  propertySlug: "schedule",
  definition: "a unit's start times",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating a schedule is started by a timer rather than kept running.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-31T23:55:19.470Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies TextProperty
