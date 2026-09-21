import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const recipe = {
  id: "01a0c628-7d3e-7ccc-8fb6-7b0821863ac8",
  type: "page-type/common-language-term",
  slug: "recipe",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "recipe" },
    { partOfSpeech: "part-of-speech/noun", spelling: "recipes" },
  ],
} as const satisfies CommonLanguageTerm
