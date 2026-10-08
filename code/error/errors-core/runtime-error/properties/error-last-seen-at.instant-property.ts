import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const errorLastSeenAt = {
  id: "01a05f3f-e3e0-7d03-874b-3c6c7f2183d1",
  type: "page-type/instant-property",
  slug: "error-last-seen-at",
  propertySlug: "last-seen-at",
  definition: "when an error was most recently met",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment an error was last met moves whenever the error is met again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment an error was last met is kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error naming no such moment was last met at an unknown moment.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T23:13:37.760Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies InstantProperty
