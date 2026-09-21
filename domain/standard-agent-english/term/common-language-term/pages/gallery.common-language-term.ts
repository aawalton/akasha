import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const gallery = {
  id: "01a0c62d-1d0b-7895-a5f2-27e2dc0a1982",
  type: "page-type/common-language-term",
  slug: "gallery",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "gallery" },
    { partOfSpeech: "part-of-speech/noun", spelling: "galleries" },
  ],
} as const satisfies CommonLanguageTerm
