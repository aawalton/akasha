import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const nextAt = {
  id: "01a05f42-d941-7005-9b78-ea153ee9fc0f",
  type: "instant-property",
  slug: "next-at",
  propertySlug: "next-at",
  definition: "when a repeating thing next falls due",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The reminders that are due are read from here rather than worked out from the clock alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no such instant has never been armed.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
