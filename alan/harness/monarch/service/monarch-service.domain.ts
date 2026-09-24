import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const monarchService = {
  id: "01a0d5bd-4128-7484-86a9-4748c66534e6",
  type: "page-type/domain",
  slug: "monarch-service",
  definition: "an external service for money",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Monarch" }],
} as const satisfies Domain
