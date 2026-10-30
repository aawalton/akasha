import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const rename = {
  id: "01a18dc3-5dad-73a5-aa52-327f06fc8da2",
  type: "page-type/common-language-term",
  slug: "rename",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "rename" },
    { partOfSpeech: "part-of-speech/verb", spelling: "renames" },
    { partOfSpeech: "part-of-speech/verb", spelling: "renamed" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "renamed" },
  ],
  createdAt: "2026-10-30T17:02:33.388Z",
  updatedAt: "2026-10-30T17:02:33.388Z",
} as const satisfies CommonLanguageTerm
