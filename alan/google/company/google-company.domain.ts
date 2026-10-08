import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const googleCompany = {
  id: "01a0d56d-6a75-704e-bd41-43cfb0bde718",
  type: "page-type/domain",
  slug: "google-company",
  definition: "a company that runs external services",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Google" }],
  createdAt: "2026-09-24T21:58:32.821Z",
  updatedAt: "2026-09-24T21:58:34.000Z",
} as const satisfies Domain
