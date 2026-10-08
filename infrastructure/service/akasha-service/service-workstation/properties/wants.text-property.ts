import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const wants = {
  id: "01a06738-9f12-7c0b-8ea5-4b76050ff060",
  type: "page-type/text-property",
  slug: "wants",
  propertySlug: "wants",
  definition: "a unit this unit asks to run without depending on it",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit named failing to start leaves this service starting all the same.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T12:22:39.122Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies TextProperty
