import type { TextProperty } from "@akasha/pages-system/text-property"

export type RoyalRoadPassword = string

export const royalRoadPassword = {
  id: "01a0685d-b81f-7541-8732-e260a40fbd41",
  pageTypeSlug: "text-property",
  slug: "royal-road-password",
  propertySlug: "password",
  definition: "what authorises a Royal Road account's sign-in",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The password stands in the page's sops file rather than in the page.",
    },
  ],
} as const satisfies TextProperty
