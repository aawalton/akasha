import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const improve = {
  id: "01a18d40-dbab-76b6-b807-914a7665cab8",
  type: "page-type/common-language-term",
  slug: "improve",
  definition: "to make something better",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "improve" },
    { partOfSpeech: "part-of-speech/verb", spelling: "improves" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "improved" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "improving" },
  ],
  createdAt: "2026-10-30T14:40:00.424Z",
  updatedAt: "2026-10-30T14:40:00.424Z",
} as const satisfies CommonLanguageTerm
