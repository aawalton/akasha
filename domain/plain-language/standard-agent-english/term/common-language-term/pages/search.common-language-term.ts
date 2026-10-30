import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const search = {
  id: "01a18d47-d7b4-7358-9d53-c2738890fbdf",
  type: "page-type/common-language-term",
  slug: "search",
  definition: "looking through things to find something",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "search" },
    { partOfSpeech: "part-of-speech/noun", spelling: "searches" },
    { partOfSpeech: "part-of-speech/verb", spelling: "search" },
    { partOfSpeech: "part-of-speech/verb", spelling: "searches" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "searched" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "searching" },
  ],
  createdAt: "2026-10-30T14:47:38.158Z",
  updatedAt: "2026-10-30T14:47:38.158Z",
} as const satisfies CommonLanguageTerm
