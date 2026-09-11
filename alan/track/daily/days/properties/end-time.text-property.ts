import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const endTime = {
  id: "01a05fd8-c30f-7276-a32d-648df6a73f30",
  type: "text-property",
  slug: "end-time",
  propertySlug: "end-time",
  definition: "when a stretch of time ended",
  maxLength: 24,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is an instant rather than text.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
