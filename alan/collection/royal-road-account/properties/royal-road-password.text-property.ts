import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const royalRoadPassword = {
  id: "01a0685d-b81f-7541-8732-e260a40fbd41",
  type: "page-type/text-property",
  slug: "royal-road-password",
  propertySlug: "password",
  definition: "the password of a Royal Road account",
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
  updatedAt: "2026-10-30T15:15:58.190Z",
} as const satisfies TextProperty
