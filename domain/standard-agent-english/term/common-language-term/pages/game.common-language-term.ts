import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const game = {
  id: "01a0d4ed-d01a-7f62-9103-80f3cee65429",
  type: "page-type/common-language-term",
  slug: "game",
  definition: "something people play by rules",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "game" },
    { partOfSpeech: "part-of-speech/noun", spelling: "games" },
  ],
} as const satisfies CommonLanguageTerm
