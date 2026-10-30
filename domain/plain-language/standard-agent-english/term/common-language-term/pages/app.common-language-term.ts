import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const app = {
  id: "01a18d79-5ea3-7036-a7e2-bb3f519ce546",
  type: "page-type/common-language-term",
  slug: "app",
  definition: "a program that people use on a phone or a computer",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "app" },
    { partOfSpeech: "part-of-speech/noun", spelling: "apps" },
  ],
  createdAt: "2026-10-30T15:41:43.969Z",
  updatedAt: "2026-10-30T15:41:43.969Z",
} as const satisfies CommonLanguageTerm
