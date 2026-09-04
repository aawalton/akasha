import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type MarkedReadAt = string

export const markedReadAt = {
  id: "01a06860-cb0c-7346-bb65-3d5bb4069535",
  pageTypeSlug: "instant-property",
  slug: "marked-read-at",
  propertySlug: "marked-read-at",
  definition: "when the source a collection was read from was told the collection had been read",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Reading a chapter here and telling the source so are two moments.",
    },
    {
      invariantKind: "departure",
      statement: "A collection whose source was never told states no moment it was told at.",
    },
  ],
} as const satisfies InstantProperty
