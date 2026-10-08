import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const royalRoadPassword = {
  id: "01a0685d-b81f-7541-8732-e260a40fbd41",
  type: "page-type/text-property",
  slug: "royal-road-password",
  propertySlug: "password",
  definition: "what authorises a Royal Road account's sign-in",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The password is in the page's sops file rather than in the page.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:42:47.583Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
