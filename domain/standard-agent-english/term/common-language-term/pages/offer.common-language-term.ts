import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const offer = {
  id: "01a0c627-7cdd-79a1-831c-d5c241f2414b",
  type: "page-type/common-language-term",
  slug: "offer",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "offer" },
    { partOfSpeech: "part-of-speech/noun", spelling: "offers" },
  ],
} as const satisfies CommonLanguageTerm
