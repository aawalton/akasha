import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const go = {
  id: "01a0d497-c523-729c-ada3-7b0677dc28e1",
  type: "page-type/common-language-term",
  slug: "go",
  definition: "to move from one place to another",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "go" },
    { partOfSpeech: "part-of-speech/verb", spelling: "goes" },
  ],
} as const satisfies CommonLanguageTerm
