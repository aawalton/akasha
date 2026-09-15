import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const workedAt = {
  id: "01a08caf-449d-7319-acb4-c598e9e345ee",
  type: "page-type/instant-property",
  slug: "worked-at",
  propertySlug: "worked-at",
  definition: "when a service last finished a round of its own work",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The service doing the work writes the moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing else writes the moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment moves only where a round of that work finished.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service dying part way through a round leaves the moment unmoved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment says work landed rather than saying a process is alive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service started over and over without finishing a round never moves the moment.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
