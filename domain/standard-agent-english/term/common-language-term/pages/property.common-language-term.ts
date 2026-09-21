import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const property = {
  id: "01a0c622-c6ee-7da1-9be6-490481e32cc6",
  type: "page-type/common-language-term",
  slug: "property",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "property" },
    { partOfSpeech: "part-of-speech/noun", spelling: "properties" },
  ],
} as const satisfies CommonLanguageTerm
