import type { InstantProperty } from "@akasha/pages/instant-property"

export type MessageClaimedAt = string

export const messageClaimedAt = {
  id: "01a06818-107b-7004-8256-c637bdc728bd",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "message-claimed-at",
  propertySlug: "claimed-at",
  definition: "when a recipient took a message up to read it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message with no such instant is waiting to be read.",
    },
    {
      invariantKind: "departure",
      statement: "A claim is let go rather than taken back.",
    },
    {
      invariantKind: "departure",
      statement: "A message whose claim is let go waits again.",
    },
    {
      invariantKind: "departure",
      statement: "A claim sits outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A claim goes when its message goes.",
    },
  ],
} as const satisfies InstantProperty
