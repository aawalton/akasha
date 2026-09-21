import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const shape = {
  id: "01a0c602-487b-7f5a-806f-20aae1b61200",
  type: "page-type/common-language-term",
  slug: "shape",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "shape" },
    { partOfSpeech: "part-of-speech/noun", spelling: "shapes" },
  ],
} as const satisfies CommonLanguageTerm
