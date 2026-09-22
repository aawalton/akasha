import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const deviceTokenLastSeenAt = {
  id: "01a05dc7-77dc-73b5-90f0-3a2845a662e6",
  type: "page-type/instant-property",
  slug: "device-token-last-seen-at",
  propertySlug: "last-seen-at",
  definition: "when a device last registered its token",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A token carrying no such instant has not been registered again.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
