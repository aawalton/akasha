import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type MonarchUpdatedAt = string

export const monarchUpdatedAt = {
  id: "01a0680b-2b00-7002-b471-2e8c6a3d2103",
  pageTypeSlug: "instant-property",
  slug: "monarch-updated-at",
  propertySlug: "monarch-updated-at",
  definition: "the moment Monarch last changed a transaction",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The poll refetches a transaction whose moment has moved past the one held here.",
    },
  ],
} as const satisfies InstantProperty
