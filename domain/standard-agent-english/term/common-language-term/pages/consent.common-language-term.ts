import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const consent = {
  id: "01a0d579-3b81-7700-beda-3d095047035e",
  type: "page-type/common-language-term",
  slug: "consent",
  definition: "leave someone gives for something to be done",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "consent" },
    { partOfSpeech: "part-of-speech/noun", spelling: "consents" },
  ],
} as const satisfies CommonLanguageTerm
