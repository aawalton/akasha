import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const writ = {
  id: "01a0c62c-b052-7dd7-b56f-ee4acec50dbc",
  type: "page-type/common-language-term",
  slug: "writ",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "writ" },
    { partOfSpeech: "part-of-speech/noun", spelling: "writs" },
  ],
} as const satisfies CommonLanguageTerm
