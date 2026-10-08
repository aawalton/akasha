import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const viewPredicate = {
  id: "01a0680d-4d00-7002-b647-3d1a8c5f4103",
  type: "page-type/text-property",
  slug: "view-predicate",
  propertySlug: "view-predicate",
  definition: "the named test drawing a cross-type view",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view names a predicate instead of a page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view naming a predicate and a page type at once is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A predicate is named in lower kebab.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A predicate no registry answers for lists nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:14:57.280Z",
  updatedAt: "2026-09-22T13:55:48.000Z",
} as const satisfies TextProperty
