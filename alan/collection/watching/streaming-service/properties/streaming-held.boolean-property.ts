import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const streamingHeld = {
  id: "01a18432-af58-76df-a193-4af9dd578662",
  type: "page-type/boolean-property",
  slug: "streaming-held",
  propertySlug: "held",
  definition: "whether Alan pays for a streaming service now",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is held where Monarch shows Alan paying for it in the latest months.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is held where Alan says it is, whatever Monarch shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service neither a charge nor Alan's word shows held states false.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T20:27:56.630Z",
  updatedAt: "2026-10-28T21:25:13.619Z",
} as const satisfies BooleanProperty
