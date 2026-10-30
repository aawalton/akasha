import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hash = {
  id: "01a18d79-c688-7ef3-aabd-631ea24941a0",
  type: "page-type/common-language-term",
  slug: "hash",
  definition: "a short value that code makes from text",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "hash" },
    { partOfSpeech: "part-of-speech/noun", spelling: "hashes" },
  ],
  createdAt: "2026-10-30T15:42:10.567Z",
  updatedAt: "2026-10-30T15:42:10.567Z",
} as const satisfies CommonLanguageTerm
