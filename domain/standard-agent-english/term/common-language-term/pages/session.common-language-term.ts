import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const session = {
  id: "01a0c626-a511-7a5a-907e-512f79f29248",
  type: "page-type/common-language-term",
  slug: "session",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "session" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sessions" },
  ],
} as const satisfies CommonLanguageTerm
