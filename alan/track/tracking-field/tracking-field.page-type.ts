import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingField = {
  id: "01a06827-ec0c-79f7-864d-da0cf491975e",
  type: "page-type/page-type",
  slug: "tracking-field",
  definition: "an aspect of Alan that takes a value each time it is observed",
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field is observed rather than set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each value a field has is one observation.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "No property here declares the capture a field names.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  createdAt: "2026-09-03T16:44:01.932Z",
  updatedAt: "2026-09-24T19:52:23.000Z",
} as const satisfies PageType
