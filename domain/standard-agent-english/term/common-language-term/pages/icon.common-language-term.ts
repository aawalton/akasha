import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const icon = {
  id: "01a0c601-2b77-7ef7-a838-8dd636d7e5ae",
  type: "page-type/common-language-term",
  slug: "icon",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "icon" },
    { partOfSpeech: "part-of-speech/noun", spelling: "icons" },
  ],
} as const satisfies CommonLanguageTerm
