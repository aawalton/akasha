import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const zone = {
  id: "01a0c622-2f74-7eac-959b-f2b8c2381825",
  type: "page-type/common-language-term",
  slug: "zone",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "zone" },
    { partOfSpeech: "part-of-speech/noun", spelling: "zones" },
  ],
} as const satisfies CommonLanguageTerm
