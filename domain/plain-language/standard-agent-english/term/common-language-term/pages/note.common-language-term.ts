import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const note = {
  id: "01a18d48-75d1-7934-b439-1a114d6adcc6",
  type: "page-type/common-language-term",
  slug: "note",
  definition: "a short piece of writing kept to remember something",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "note" },
    { partOfSpeech: "part-of-speech/noun", spelling: "notes" },
  ],
  createdAt: "2026-10-30T14:48:18.640Z",
  updatedAt: "2026-10-30T14:48:18.640Z",
} as const satisfies CommonLanguageTerm
