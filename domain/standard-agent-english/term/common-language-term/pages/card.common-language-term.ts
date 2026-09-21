import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const card = {
  id: "01a0c622-eb6f-7fb4-a5f0-6a4b5413674c",
  type: "page-type/common-language-term",
  slug: "card",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "card" },
    { partOfSpeech: "part-of-speech/noun", spelling: "cards" },
  ],
} as const satisfies CommonLanguageTerm
