import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const assume = {
  id: "01a18d5d-d24b-79f7-8b67-803bcc112e50",
  type: "page-type/common-language-term",
  slug: "assume",
  definition: "to take a thing as true without proof",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "assume" },
    { partOfSpeech: "part-of-speech/verb", spelling: "assumes" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "assumed" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "assuming" },
  ],
  createdAt: "2026-10-30T15:11:38.570Z",
  updatedAt: "2026-10-30T15:11:38.570Z",
} as const satisfies CommonLanguageTerm
