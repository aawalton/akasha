import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const bank = {
  id: "01a0c628-a243-7a74-950c-90c52fa8514b",
  type: "page-type/common-language-term",
  slug: "bank",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "bank" },
    { partOfSpeech: "part-of-speech/noun", spelling: "banks" },
  ],
} as const satisfies CommonLanguageTerm
