import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const publicationStatus = {
  id: "01a06554-d8bd-750b-95f4-3b810f2c4875",
  type: "page-type/select-property",
  slug: "publication-status",
  propertySlug: "publication-status",
  definition: "how far the source has got with putting a collection out",
  values: ["ongoing", "hiatus", "completed"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A publication status is the source's own state rather than how far the person has got.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:34:14.461Z",
  updatedAt: "2026-09-19T08:48:28.000Z",
} as const satisfies SelectProperty
