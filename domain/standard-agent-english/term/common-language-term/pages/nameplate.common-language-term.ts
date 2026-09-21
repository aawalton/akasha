import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const nameplate = {
  id: "01a0c627-69f7-780c-9b90-24c0571bdfdd",
  type: "page-type/common-language-term",
  slug: "nameplate",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "nameplate" },
    { partOfSpeech: "part-of-speech/noun", spelling: "nameplates" },
  ],
} as const satisfies CommonLanguageTerm
