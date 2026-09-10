import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RoyalRoadPassword = string

export const royalRoadPassword = {
  id: "01a0685d-b81f-7541-8732-e260a40fbd41",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "royal-road-password",
  propertySlug: "password",
  definition: "what authorises a Royal Road account's sign-in",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The password is in the page's sops file rather than in the page.",
    },
  ],
} as const satisfies TextProperty
