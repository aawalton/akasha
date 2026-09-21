import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const display = {
  id: "01a0c626-1052-738a-8713-26a4b6ff0176",
  type: "page-type/common-language-term",
  slug: "display",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "display" },
    { partOfSpeech: "part-of-speech/noun", spelling: "displays" },
  ],
} as const satisfies CommonLanguageTerm
