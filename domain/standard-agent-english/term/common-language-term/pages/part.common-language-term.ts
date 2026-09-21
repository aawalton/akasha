import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const part = {
  id: "01a0c624-9ddb-7f17-b092-c16719c80098",
  type: "page-type/common-language-term",
  slug: "part",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "part" },
    { partOfSpeech: "part-of-speech/noun", spelling: "parts" },
  ],
} as const satisfies CommonLanguageTerm
