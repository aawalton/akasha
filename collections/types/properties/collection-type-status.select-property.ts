import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const collectionTypeStatus = {
  id: "01a0680f-6f00-7000-9a52-4c7b3d8e6101",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "collection-type-status",
  propertySlug: "collection-type-status",
  definition: "how far a person has got with gathering a kind of thing at all",
  values: ["done", "not-doing", "someday-maybe"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This property says whether the kind is gathered rather than how far one collection has got.",
    },
  ],
} as const satisfies SelectProperty

export type CollectionTypeStatus = (typeof collectionTypeStatus.values)[number]
