import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const perform = {
  id: "01a18da9-ca41-741d-985d-b84109254bc1",
  type: "page-type/common-language-term",
  slug: "perform",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "perform" },
    { partOfSpeech: "part-of-speech/verb", spelling: "performs" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "performed" },
  ],
  createdAt: "2026-10-30T16:34:37.248Z",
  updatedAt: "2026-10-30T16:34:37.248Z",
} as const satisfies CommonLanguageTerm
