import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type NextAt = string

export const nextAt = {
  id: "01a05f42-d941-7005-9b78-ea153ee9fc0f",
  pageTypeSlug: "instant-property",
  slug: "next-at",
  propertySlug: "next-at",
  definition: "when a repeating thing next falls due",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is due is read from here rather than worked out from the clock alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying no such instant has never been armed.",
    },
  ],
} as const satisfies InstantProperty
