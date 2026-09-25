import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const guide = {
  id: "01a0d8b8-536f-7545-b07f-b16c6d93777e",
  type: "page-type/common-language-term",
  slug: "guide",
  definition: "to show the way",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "guide" },
    { partOfSpeech: "part-of-speech/verb", spelling: "guides" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "guided" },
  ],
} as const satisfies CommonLanguageTerm
