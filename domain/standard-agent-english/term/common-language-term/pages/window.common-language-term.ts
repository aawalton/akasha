import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const window = {
  id: "01a0c623-3611-7b2f-baeb-372e80493c31",
  type: "page-type/common-language-term",
  slug: "window",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "window" },
    { partOfSpeech: "part-of-speech/noun", spelling: "windows" },
  ],
} as const satisfies CommonLanguageTerm
