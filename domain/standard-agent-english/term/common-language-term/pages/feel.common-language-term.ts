import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const feel = {
  id: "01a0d5cb-d8de-7f22-9a7d-f272e030eb43",
  type: "page-type/common-language-term",
  slug: "feel",
  definition: "to sense within oneself",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "feel" },
    { partOfSpeech: "part-of-speech/verb", spelling: "feels" },
  ],
} as const satisfies CommonLanguageTerm
