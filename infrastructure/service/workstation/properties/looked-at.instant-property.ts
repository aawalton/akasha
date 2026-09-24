import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const lookedAt = {
  id: "01a08c77-9213-76ab-95b0-c5a7ef80750d",
  type: "page-type/instant-property",
  slug: "looked-at",
  propertySlug: "looked-at",
  definition: "when this service last looked at the health of every service it watches",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One service looks at the workstation services and one at the cluster services.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service that looked alone states the moment of that look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment moves on every look whether or not any verdict changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How long ago the moment was judges a verdict rather than anything on the verdict's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment is written after every verdict.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment says the whole look landed.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
