import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const shape = {
  id: "01a0d8ef-a1be-75cb-aa8c-26ca6b091799",
  type: "page-type/common-language-term",
  slug: "shape",
  definition: "the form something has",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "shape" },
    { partOfSpeech: "part-of-speech/noun", spelling: "shapes" },
  ],
} as const satisfies CommonLanguageTerm
