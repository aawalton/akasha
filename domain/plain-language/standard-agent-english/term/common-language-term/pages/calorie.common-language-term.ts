import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const calorie = {
  id: "01a18d71-3f69-7eda-bbb1-b9b4ff0fc37d",
  type: "page-type/common-language-term",
  slug: "calorie",
  definition: "a unit that counts the work a body does",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "calorie" },
    { partOfSpeech: "part-of-speech/noun", spelling: "calories" },
  ],
  createdAt: "2026-10-30T15:32:51.688Z",
  updatedAt: "2026-10-30T15:32:51.688Z",
} as const satisfies CommonLanguageTerm
