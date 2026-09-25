import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const all = {
  id: "01a0c62b-3d10-79ec-aaad-fc56d0786325",
  type: "page-type/common-language-term",
  slug: "all",
  spellings: [
    { partOfSpeech: "part-of-speech/determiner", spelling: "all" },
    { partOfSpeech: "part-of-speech/noun", spelling: "all" },
  ],
} as const satisfies CommonLanguageTerm
