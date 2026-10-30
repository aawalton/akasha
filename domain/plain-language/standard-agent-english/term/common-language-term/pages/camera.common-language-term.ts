import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const camera = {
  id: "01a18d52-bdd8-7a37-a9a3-59cba382df4e",
  type: "page-type/common-language-term",
  slug: "camera",
  definition: "a device that takes pictures or video",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "camera" },
    { partOfSpeech: "part-of-speech/noun", spelling: "cameras" },
  ],
  createdAt: "2026-10-30T14:59:32.439Z",
  updatedAt: "2026-10-30T14:59:32.439Z",
} as const satisfies CommonLanguageTerm
