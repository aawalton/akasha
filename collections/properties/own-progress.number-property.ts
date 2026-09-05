import type { NumberProperty } from "@akasha/pages-system/number-property"

export type OwnProgress = number

export const ownProgress = {
  id: "01a06553-4713-7001-b03b-f1f7f97f1aa8",
  pageTypeSlug: "number-property",
  slug: "own-progress",
  propertySlug: "own-progress",
  definition: "how far through a collection a person has got, counted in its own unit",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Progress is read against the collection's own length rather than against its parts.",
    },
  ],
} as const satisfies NumberProperty
