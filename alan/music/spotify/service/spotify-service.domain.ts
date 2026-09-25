import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const spotifyService = {
  id: "01a0d8a3-2da3-74fd-bd07-f7c4105dd5a3",
  type: "page-type/domain",
  slug: "spotify-service",
  definition: "an external service for music",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Spotify" }],
} as const satisfies Domain
