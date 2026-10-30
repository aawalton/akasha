import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const collectionTypeStatus = {
  id: "01a0680f-6f00-7000-9a52-4c7b3d8e6101",
  type: "page-type/select-property",
  slug: "collection-type-status",
  propertySlug: "collection-type-status",
  definition: "whether a person works through a kind of collection",
  values: ["done", "not-doing", "someday-maybe"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This property says whether the kind is gathered rather than how far one collection has got.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:17:17.056Z",
  updatedAt: "2026-10-30T15:17:59.259Z",
} as const satisfies SelectProperty
