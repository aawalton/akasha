import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Wants = string

export const wants = {
  id: "01a06738-9f12-7c0b-8ea5-4b76050ff060",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "wants",
  propertySlug: "wants",
  definition: "a unit this unit asks for without depending on",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit named failing to start leaves this service starting all the same.",
    },
  ],
} as const satisfies TextProperty
