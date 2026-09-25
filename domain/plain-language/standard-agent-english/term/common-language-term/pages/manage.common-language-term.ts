import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const manage = {
  id: "01a0d58f-a3c4-73c6-89dc-992ec296a40c",
  type: "page-type/common-language-term",
  slug: "manage",
  definition: "to direct the work of others",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "manage" },
    { partOfSpeech: "part-of-speech/verb", spelling: "manages" },
  ],
} as const satisfies CommonLanguageTerm
