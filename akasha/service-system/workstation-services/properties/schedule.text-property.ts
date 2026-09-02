import type { TextProperty } from "@akasha/pages-system/text-property"

export type Schedule = string

export const schedule = {
  id: "01a05a3f-b42e-78d1-a00b-e982e5830c5c",
  pageTypeSlug: "text-property",
  slug: "schedule",
  propertySlug: "schedule",
  definition: "the times a unit is started at",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service stating a schedule is started by a timer rather than kept running.",
    },
  ],
} as const satisfies TextProperty
