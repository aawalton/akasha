import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const ownLength = {
  id: "01a06553-4713-7000-832b-753158e3fec9",
  type: "page-type/number-property",
  slug: "own-length",
  propertySlug: "own-length",
  definition: "the length of a collection without its parts counted in its unit",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A length is the collection's own rather than the sum of the parts that collection has.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:32:31.635Z",
  updatedAt: "2026-10-30T15:08:40.665Z",
} as const satisfies NumberProperty
