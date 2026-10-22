import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const slash = {
  id: "01a1642a-5bd2-7ea8-9e93-47c197e5a76a",
  type: "page-type/common-language-term",
  slug: "slash",
  definition: "the mark /",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "slash" },
    { partOfSpeech: "part-of-speech/noun", spelling: "slashes" },
  ],
  createdAt: "2026-10-22T15:11:00.049Z",
  updatedAt: "2026-10-22T15:11:00.049Z",
} as const satisfies CommonLanguageTerm
