import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const publicationStatus = {
  id: "01a06554-d8bd-750b-95f4-3b810f2c4875",
  type: "select-property",
  slug: "publication-status",
  propertySlug: "publication-status",
  definition: "how far the source has got with putting a collection out",
  values: ["ongoing", "hiatus", "completed"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A publication status is the source's own state rather than how far the person has got.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
