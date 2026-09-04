import type { TextProperty } from "@akasha/pages-system/text-property"

export type After = string

export const after = {
  id: "01a06738-9f12-7d3a-bae3-9a7bbcd5ba19",
  pageTypeSlug: "text-property",
  slug: "after",
  propertySlug: "after",
  definition: "a unit this unit starts after",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit named here orders the start without being required to be there.",
    },
  ],
} as const satisfies TextProperty
