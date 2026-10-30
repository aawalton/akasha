import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sound = {
  id: "01a18d68-9a8e-7efe-9b06-c633e7cbd73f",
  type: "page-type/common-language-term",
  slug: "sound",
  definition: "what an ear hears",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "sound" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sounds" },
  ],
  createdAt: "2026-10-30T15:23:25.197Z",
  updatedAt: "2026-10-30T15:23:25.197Z",
} as const satisfies CommonLanguageTerm
