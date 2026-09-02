import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type LastSeenAt = string

export const deviceTokenLastSeenAt = {
  id: "01a05dc7-77dc-73b5-90f0-3a2845a662e6",
  pageTypeSlug: "instant-property",
  slug: "device-token-last-seen-at",
  propertySlug: "last-seen-at",
  definition: "when a device last registered the token it is reached at",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token carrying no such instant has not been registered again.",
    },
  ],
} as const satisfies InstantProperty
