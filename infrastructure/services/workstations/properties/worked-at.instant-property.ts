import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const workedAt = {
  id: "01a08caf-449d-7319-acb4-c598e9e345ee",
  type: "instant-property",
  slug: "worked-at",
  propertySlug: "worked-at",
  definition: "when a service last finished a round of its own work",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The service doing the work writes the moment.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing else writes the moment.",
    },
    {
      invariantKind: "departure",
      statement: "The moment moves only where a round of that work finished.",
    },
    {
      invariantKind: "departure",
      statement: "A service dying part way through a round leaves the moment unmoved.",
    },
    {
      invariantKind: "departure",
      statement: "The moment says work landed rather than saying a process is alive.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service started over and over without finishing a round never moves the moment.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
