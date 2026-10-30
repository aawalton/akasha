import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const spotifyWebApi = {
  id: "01a18d9a-8c2c-70a5-a27e-ae5ca65a9d31",
  type: "page-type/common-language-term",
  slug: "spotify-web-api",
  definition: "the service Spotify offers to programs",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "Spotify Web API" }],
  createdAt: "2026-10-30T16:17:58.315Z",
  updatedAt: "2026-10-30T16:17:58.315Z",
} as const satisfies CommonLanguageTerm
