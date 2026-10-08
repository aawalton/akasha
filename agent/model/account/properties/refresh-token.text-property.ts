import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const refreshToken = {
  id: "01a054d8-1d39-7d36-b315-c5558e91c93c",
  type: "page-type/text-property",
  slug: "refresh-token",
  propertySlug: "refresh-token",
  definition: "the credential a model account sends for a new credential",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "refresh token" },
    { partOfSpeech: "part-of-speech/noun", spelling: "refresh tokens" },
  ],
  maxLength: 4000,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-08-30T22:44:04.537Z",
  updatedAt: "2026-09-25T17:59:26.000Z",
} as const satisfies TextProperty
