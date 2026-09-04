import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Nice = number

export const nice = {
  id: "01a06738-9f12-7c62-9cc9-6d3df4414bcc",
  pageTypeSlug: "number-property",
  slug: "nice",
  propertySlug: "nice",
  definition: "the scheduling priority a unit runs at",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A higher number gives a unit less of the machine when the machine is busy.",
    },
  ],
} as const satisfies NumberProperty
