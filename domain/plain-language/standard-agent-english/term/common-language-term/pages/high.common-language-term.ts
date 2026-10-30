import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const high = {
  id: "01a18d55-056a-7017-a92d-9eb54fa11733",
  type: "page-type/common-language-term",
  slug: "high",
  definition: "great in amount",
  spellings: [
    { partOfSpeech: "part-of-speech/adjective", spelling: "high" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "higher" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "highest" },
  ],
  createdAt: "2026-10-30T15:02:01.833Z",
  updatedAt: "2026-10-30T15:02:01.833Z",
} as const satisfies CommonLanguageTerm
