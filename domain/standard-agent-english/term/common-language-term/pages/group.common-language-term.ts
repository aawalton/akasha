import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const group = {
  id: "01a0c625-3624-734b-bb36-1156e7c53f3c",
  type: "page-type/common-language-term",
  slug: "group",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "group" },
    { partOfSpeech: "part-of-speech/noun", spelling: "groups" },
  ],
} as const satisfies CommonLanguageTerm
