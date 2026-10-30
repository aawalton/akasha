import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const ad = {
  id: "01a18d68-338f-74a9-8f97-635844060298",
  type: "page-type/common-language-term",
  slug: "ad",
  definition: "a message that sells something",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "ad" },
    { partOfSpeech: "part-of-speech/noun", spelling: "ads" },
  ],
  createdAt: "2026-10-30T15:22:58.829Z",
  updatedAt: "2026-10-30T15:22:58.829Z",
} as const satisfies CommonLanguageTerm
