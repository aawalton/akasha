import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const googleCompany = {
  id: "01a0d56d-6a75-704e-bd41-43cfb0bde718",
  type: "page-type/domain",
  slug: "google-company",
  definition: "a company that runs external services",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Google" }],
} as const satisfies Domain
