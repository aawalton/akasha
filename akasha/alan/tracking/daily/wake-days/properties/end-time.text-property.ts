import type { TextProperty } from "@akasha/pages-system/text-property"

export type EndTime = string

export const endTime = {
  id: "01a05fd8-c30f-7276-a32d-648df6a73f30",
  pageTypeSlug: "text-property",
  slug: "end-time",
  propertySlug: "end-time",
  definition: "when a stretch of time ended",
  max: 24,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is an instant rather than text.",
    },
  ],
} as const satisfies TextProperty
