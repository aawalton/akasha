import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const transformation = {
  id: "01a0c628-0ee9-7f42-ab80-ba8d754beef1",
  type: "page-type/common-language-term",
  slug: "transformation",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "transformation" },
    { partOfSpeech: "part-of-speech/noun", spelling: "transformations" },
  ],
} as const satisfies CommonLanguageTerm
