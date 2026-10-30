import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const buy = {
  id: "01a18d66-4261-7a31-b4e1-4109977a0624",
  type: "page-type/common-language-term",
  slug: "buy",
  definition: "to get a thing by paying for it",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "buy" },
    { partOfSpeech: "part-of-speech/verb", spelling: "buys" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "bought" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "buying" },
  ],
  createdAt: "2026-10-30T15:20:51.552Z",
  updatedAt: "2026-10-30T15:20:51.552Z",
} as const satisfies CommonLanguageTerm
