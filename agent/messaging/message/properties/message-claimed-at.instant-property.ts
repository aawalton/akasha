import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const messageClaimedAt = {
  id: "01a06818-107b-7004-8256-c637bdc728bd",
  type: "instant-property",
  slug: "message-claimed-at",
  propertySlug: "claimed-at",
  definition: "when a recipient took a message up to read it",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message with no such instant is waiting to be read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A claim is let go rather than taken back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message whose claim is let go waits again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A claim sits outside the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A claim goes when its message goes.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
