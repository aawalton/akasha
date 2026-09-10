import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type WorkedAt = string

export const workedAt = {
  id: "01a08caf-449d-7319-acb4-c598e9e345ee",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "worked-at",
  propertySlug: "worked-at",
  definition: "when a service last finished a round of its own work",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The service doing the work writes this, and nothing else writes it.",
    },
    {
      invariantKind: "departure",
      statement: "This moves only where a round of that work finished.",
    },
    {
      invariantKind: "departure",
      statement: "A service dying part way through a round leaves this where it was.",
    },
    {
      invariantKind: "departure",
      statement: "This says work landed rather than saying a process is alive.",
    },
    {
      invariantKind: "departure",
      statement: "A service started over and over without finishing a round never moves this.",
    },
  ],
} as const satisfies InstantProperty
