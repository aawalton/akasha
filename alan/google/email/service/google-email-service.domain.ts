import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const googleEmailService = {
  id: "01a0d576-cbc1-701a-8a0c-31460e80b7c9",
  type: "page-type/domain",
  slug: "google-email-service",
  definition: "an external service for email",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Gmail" }],
} as const satisfies Domain
