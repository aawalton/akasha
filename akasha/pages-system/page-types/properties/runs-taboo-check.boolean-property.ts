import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type RunsTabooCheck = boolean

export const runsTabooCheck = {
  id: "01a063ce-6216-7009-b70d-d16728945271",
  pageTypeSlug: "boolean-property",
  slug: "runs-taboo-check",
  propertySlug: "runs-taboo-check",
  definition: "whether the taboo terms are judged over the pages of a page type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type saying nothing here is judged.",
    },
    {
      invariantKind: "departure",
      statement: "No page of a page type saying false is judged.",
    },
    {
      invariantKind: "departure",
      statement: "What a page type's own file carries is judged whatever that page type says.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says false here where the words its pages carry are somebody else's.",
    },
  ],
} as const satisfies BooleanProperty
