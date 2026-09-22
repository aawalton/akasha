import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const well = {
  id: "01a08c77-7bb7-706c-8b79-08bbd7620c7a",
  type: "page-type/boolean-property",
  slug: "well",
  propertySlug: "well",
  definition: "whether a service was running as it should at the last look",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service nothing has looked at states this neither way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The verdict holds one look's finding rather than the service's state now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A look writes the verdict only where the look's finding differs from the verdict written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The verdict carries no moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How long ago the verdict was written says nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value cleared away is written again by the next look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service no longer looked at keeps the verdict the last look reaching that service left.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
