import type { TextProperty } from "@akasha/pages-system/text-property"

export type Wants = string

export const wants = {
  id: "01a06738-9f12-7c0b-8ea5-4b76050ff060",
  pageTypeSlug: "text-property",
  slug: "wants",
  propertySlug: "wants",
  definition: "a unit this unit asks for without depending on",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit named failing to start leaves this one starting all the same.",
    },
  ],
} as const satisfies TextProperty
