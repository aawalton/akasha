import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type After = string

export const after = {
  id: "01a06738-9f12-7d3a-bae3-9a7bbcd5ba19",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "after",
  propertySlug: "after",
  definition: "a unit this unit starts after",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit named here orders the start without being required to be there.",
    },
  ],
} as const satisfies TextProperty
