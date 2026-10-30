import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const winner = {
  id: "01a18d52-c29e-7166-80aa-5c92c1a643ee",
  type: "page-type/common-language-term",
  slug: "winner",
  definition: "the one who wins a game or a contest",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "winner" },
    { partOfSpeech: "part-of-speech/noun", spelling: "winners" },
  ],
  createdAt: "2026-10-30T14:59:33.661Z",
  updatedAt: "2026-10-30T14:59:33.661Z",
} as const satisfies CommonLanguageTerm
