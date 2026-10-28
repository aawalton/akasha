import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const streamingFree = {
  id: "01a18432-af58-7f09-ae13-45289e837c3d",
  type: "page-type/boolean-property",
  slug: "streaming-free",
  propertySlug: "free",
  definition: "whether anyone watches a streaming service free, with ads",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service free with ads is free though it also sells a tier without them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service whose free tier is not known for certain states false.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T20:27:56.630Z",
  updatedAt: "2026-10-28T20:27:56.630Z",
} as const satisfies BooleanProperty
