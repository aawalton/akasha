import type { SelectProperty } from "@akasha/pages-system/select-property"

export const bookKind = {
  id: "01a06598-222b-7000-bb0f-a397a9a287fe",
  pageTypeSlug: "select-property",
  slug: "book-kind",
  propertySlug: "kind",
  definition: "whether Alan reads a book or writes it",
  values: ["read", "written"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book Alan is writing is read by nobody else while he writes it.",
    },
  ],
} as const satisfies SelectProperty

export type BookKind = (typeof bookKind.values)[number]
