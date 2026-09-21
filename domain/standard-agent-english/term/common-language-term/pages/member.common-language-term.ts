import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const member = {
  id: "01a0c628-3424-7040-a450-dfdf4a1d6500",
  type: "page-type/common-language-term",
  slug: "member",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "member" },
    { partOfSpeech: "part-of-speech/noun", spelling: "members" },
  ],
} as const satisfies CommonLanguageTerm
