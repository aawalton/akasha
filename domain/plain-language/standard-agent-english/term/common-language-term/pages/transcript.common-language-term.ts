import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const transcript = {
  id: "01a0d9cb-eff9-725a-a45a-e38703e9950a",
  type: "page-type/common-language-term",
  slug: "transcript",
  definition: "the written record of a conversation",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "transcript" },
    { partOfSpeech: "part-of-speech/noun", spelling: "transcripts" },
  ],
} as const satisfies CommonLanguageTerm
