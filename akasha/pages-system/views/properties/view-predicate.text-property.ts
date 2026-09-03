import type { TextProperty } from "@akasha/pages-system/text-property"

export type ViewPredicate = string

export const viewPredicate = {
  id: "01a0680d-4d00-7002-b647-3d1a8c5f4103",
  pageTypeSlug: "text-property",
  slug: "view-predicate",
  propertySlug: "view-predicate",
  definition: "the named test a cross-type view draws by",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view names a predicate instead of a page type, never both.",
    },
  ],
} as const satisfies TextProperty
