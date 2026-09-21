import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const panel = {
  id: "01a0c622-8c7d-7cc9-a81e-56b0df8c31b6",
  type: "page-type/common-language-term",
  slug: "panel",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "panel" },
    { partOfSpeech: "part-of-speech/noun", spelling: "panels" },
  ],
} as const satisfies CommonLanguageTerm
