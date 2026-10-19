import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const accessToken = {
  id: "01a054d8-1d39-7ce5-b138-6d39609810b0",
  type: "page-type/text-property",
  slug: "access-token",
  propertySlug: "access-token",
  definition: "the credential of a model account that code sends to Anthropic to use a model",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "access token" },
    { partOfSpeech: "part-of-speech/noun", spelling: "access tokens" },
  ],
  maxLength: 4000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The access token sits in the page's sops file rather than in the page.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T22:44:04.537Z",
  updatedAt: "2026-10-19T18:38:02.764Z",
} as const satisfies TextProperty
