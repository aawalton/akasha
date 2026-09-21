import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const trait = {
  id: "01a0c629-fa0c-7570-96b5-6c212018f56e",
  type: "page-type/common-language-term",
  slug: "trait",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "trait" },
    { partOfSpeech: "part-of-speech/noun", spelling: "traits" },
  ],
} as const satisfies CommonLanguageTerm
