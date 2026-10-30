import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const tmdb = {
  id: "01a18d69-67fe-7ebf-ab25-db1bf30c24a2",
  type: "page-type/domain",
  slug: "tmdb",
  definition: "an external service for shows and movies",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "TMDB" }],
  createdAt: "2026-10-30T15:24:17.789Z",
  updatedAt: "2026-10-30T15:24:17.789Z",
} as const satisfies Domain
