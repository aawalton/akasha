import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const plan = {
  id: "01a18d4f-9a81-7f20-9d86-0212d6813f5f",
  type: "page-type/common-language-term",
  slug: "plan",
  definition: "what someone means to do and when",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "plan" },
    { partOfSpeech: "part-of-speech/noun", spelling: "plans" },
  ],
  createdAt: "2026-10-30T14:56:06.784Z",
  updatedAt: "2026-10-30T14:56:06.784Z",
} as const satisfies CommonLanguageTerm
