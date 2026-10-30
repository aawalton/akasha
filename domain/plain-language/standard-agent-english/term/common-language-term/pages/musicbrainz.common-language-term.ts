import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const musicbrainz = {
  id: "01a18d9a-19d9-7f86-be53-10fa3e49d66a",
  type: "page-type/common-language-term",
  slug: "musicbrainz",
  definition: "an open database of music on the web",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "MusicBrainz" }],
  createdAt: "2026-10-30T16:17:29.047Z",
  updatedAt: "2026-10-30T16:17:29.047Z",
} as const satisfies CommonLanguageTerm
