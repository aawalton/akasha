import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const imdb = {
  id: "01a18d6b-5621-76d0-8468-fc6b419f5474",
  type: "page-type/domain",
  slug: "imdb",
  definition: "an external service that lists shows and movies",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "IMDb" }],
  createdAt: "2026-10-30T15:26:24.288Z",
  updatedAt: "2026-10-30T15:26:24.288Z",
} as const satisfies Domain
