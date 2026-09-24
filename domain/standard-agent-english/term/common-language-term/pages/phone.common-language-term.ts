import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const phone = {
  id: "01a0d585-7a13-701d-a853-abb56500555d",
  type: "page-type/common-language-term",
  slug: "phone",
  definition: "a small device for calls and messages",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "phone" },
    { partOfSpeech: "part-of-speech/noun", spelling: "phones" },
  ],
} as const satisfies CommonLanguageTerm
