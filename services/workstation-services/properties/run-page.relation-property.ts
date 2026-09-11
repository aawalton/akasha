import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const runPage = {
  id: "01a08e05-88b5-79ae-9861-307635aeb358",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "run-page",
  propertySlug: "pages",
  definition: "a page whose path a command hands to the module that command runs",
  targetPageType: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page named here is handed over as that page's own path.",
    },
    {
      invariantKind: "departure",
      statement: "The pages are handed over in the order the pages are in.",
    },
    {
      invariantKind: "departure",
      statement: "A page moving to another folder leaves the command naming that page whole.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
