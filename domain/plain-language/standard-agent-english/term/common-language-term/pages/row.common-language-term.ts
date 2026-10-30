import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const row = {
  id: "01a18d4e-41ee-7816-9549-00231022ca14",
  type: "page-type/common-language-term",
  slug: "row",
  definition: "a line of things side by side",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "row" },
    { partOfSpeech: "part-of-speech/noun", spelling: "rows" },
  ],
  createdAt: "2026-10-30T14:54:38.573Z",
  updatedAt: "2026-10-30T14:54:38.573Z",
} as const satisfies CommonLanguageTerm
