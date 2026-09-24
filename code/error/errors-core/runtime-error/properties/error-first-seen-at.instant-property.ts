import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const errorFirstSeenAt = {
  id: "01a05f3f-e3e0-79ae-a33f-a08a9966c72b",
  type: "page-type/instant-property",
  slug: "error-first-seen-at",
  propertySlug: "first-seen-at",
  definition: "when an error was met for the first time",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment an error was first met is the moment the error's page was filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment an error was first met never moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment an error was first met is written into the commit.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
