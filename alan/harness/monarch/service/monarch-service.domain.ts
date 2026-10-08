import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const monarchService = {
  id: "01a0d5bd-4128-7484-86a9-4748c66534e6",
  type: "page-type/domain",
  slug: "monarch-service",
  definition: "an external service for money",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Monarch" }],
  createdAt: "2026-09-24T23:25:45.128Z",
  updatedAt: "2026-09-24T23:25:48.000Z",
} as const satisfies Domain
