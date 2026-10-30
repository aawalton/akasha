import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const risk = {
  id: "01a18d47-5ad0-7dff-b649-099473b24e62",
  type: "page-type/common-language-term",
  slug: "risk",
  definition: "to do something that can go badly",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "risk" },
    { partOfSpeech: "part-of-speech/verb", spelling: "risks" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "risked" },
  ],
  createdAt: "2026-10-30T14:47:06.190Z",
  updatedAt: "2026-10-30T14:47:06.190Z",
} as const satisfies CommonLanguageTerm
