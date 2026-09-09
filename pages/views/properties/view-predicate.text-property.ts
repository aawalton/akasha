import type { TextProperty } from "@akasha/pages/text-property"

export type ViewPredicate = string

export const viewPredicate = {
  id: "01a0680d-4d00-7002-b647-3d1a8c5f4103",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "view-predicate",
  propertySlug: "view-predicate",
  definition: "the named test a cross-type view draws by",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view names a predicate instead of a page type.",
    },
    {
      invariantKind: "departure",
      statement: "A view naming a predicate and a page type at once is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A predicate is named in lower kebab.",
    },
    {
      invariantKind: "departure",
      statement: "A predicate no registry answers for lists nothing.",
    },
  ],
} as const satisfies TextProperty
