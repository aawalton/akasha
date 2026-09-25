import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const stream = {
  id: "01a0d9ce-7656-797e-a973-bfa623501f2a",
  type: "page-type/common-language-term",
  slug: "stream",
  definition: "an answer sent in pieces over one open connection",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "stream" },
    { partOfSpeech: "part-of-speech/noun", spelling: "streams" },
  ],
} as const satisfies CommonLanguageTerm
