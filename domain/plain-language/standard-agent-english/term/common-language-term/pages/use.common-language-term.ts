import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const use = {
  id: "01a0d57a-2034-78a8-89c8-2193c67baae1",
  type: "page-type/common-language-term",
  slug: "use",
  definition: "to put something to work",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "use" },
    { partOfSpeech: "part-of-speech/verb", spelling: "uses" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "used" },
  ],
} as const satisfies CommonLanguageTerm
