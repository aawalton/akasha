import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const keep = {
  id: "01a0d92d-ca77-7b52-9fdd-c93fb23e0071",
  type: "page-type/common-language-term",
  slug: "keep",
  definition: "to hold in a state",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "keep" },
    { partOfSpeech: "part-of-speech/verb", spelling: "keeps" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "kept" },
  ],
} as const satisfies CommonLanguageTerm
