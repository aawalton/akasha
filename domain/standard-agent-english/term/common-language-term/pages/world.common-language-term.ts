import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const world = {
  id: "01a0c626-2509-7bfb-bede-6b5fa52757cb",
  type: "page-type/common-language-term",
  slug: "world",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "world" },
    { partOfSpeech: "part-of-speech/noun", spelling: "worlds" },
  ],
} as const satisfies CommonLanguageTerm
