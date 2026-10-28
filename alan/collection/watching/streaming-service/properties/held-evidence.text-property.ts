import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const heldEvidence = {
  id: "01a18432-af57-7797-88fc-6e3ab08f7c94",
  type: "page-type/text-property",
  slug: "held-evidence",
  propertySlug: "held-evidence",
  definition: "what shows whether Alan pays for a streaming service",
  maxLength: 400,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The evidence names the charges found and the days they fell on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service no charge was found for says so rather than naming one.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T20:27:56.630Z",
  updatedAt: "2026-10-28T20:27:56.630Z",
} as const satisfies TextProperty
