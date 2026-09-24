import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const store = {
  id: "01a0d574-38bd-7257-88bd-eb114bc47df1",
  type: "page-type/common-language-term",
  slug: "store",
  definition: "to keep something to be used later, or a place things are kept",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "store" },
    { partOfSpeech: "part-of-speech/verb", spelling: "stores" },
    { partOfSpeech: "part-of-speech/noun", spelling: "store" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stores" },
  ],
} as const satisfies CommonLanguageTerm
