import type { TextProperty } from "@akasha/pages-system/text-property"

export type StartTime = string

export const startTime = {
  id: "01a05fd8-c30f-7ca9-8fb4-9d1d3b574b45",
  pageTypeSlug: "text-property",
  slug: "start-time",
  propertySlug: "start-time",
  definition: "when a stretch of time began",
  max: 24,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is an instant rather than text.",
    },
  ],
} as const satisfies TextProperty
