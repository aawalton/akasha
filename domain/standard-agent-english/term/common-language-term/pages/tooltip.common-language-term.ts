import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tooltip = {
  id: "01a0c602-dc4c-7a89-b78a-30a8adac6aac",
  type: "page-type/common-language-term",
  slug: "tooltip",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tooltip" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tooltips" },
  ],
} as const satisfies CommonLanguageTerm
