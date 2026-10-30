import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sign = {
  id: "01a18d78-2d28-784a-b29d-baa89c1ad349",
  type: "page-type/common-language-term",
  slug: "sign",
  definition: "to mark code with a key that proves who made the code",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "sign" },
    { partOfSpeech: "part-of-speech/verb", spelling: "signs" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "signed" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "signing" },
  ],
  createdAt: "2026-10-30T15:40:25.767Z",
  updatedAt: "2026-10-30T15:40:25.767Z",
} as const satisfies CommonLanguageTerm
