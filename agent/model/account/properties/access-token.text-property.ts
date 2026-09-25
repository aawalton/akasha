import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const accessToken = {
  id: "01a054d8-1d39-7ce5-b138-6d39609810b0",
  type: "page-type/text-property",
  slug: "access-token",
  propertySlug: "access-token",
  definition: "the credential of a model account that code sends to Anthropic to use a model",
  maxLength: 4000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The access token sits in the page's sops file rather than in the page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
