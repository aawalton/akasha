import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const recording = {
  id: "01a18d97-1a6c-7660-93f4-56157345544c",
  type: "page-type/common-language-term",
  slug: "recording",
  definition: "sound a device keeps to play",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "recording" },
    { partOfSpeech: "part-of-speech/noun", spelling: "recordings" },
  ],
  createdAt: "2026-10-30T16:14:12.586Z",
  updatedAt: "2026-10-30T16:14:12.586Z",
} as const satisfies CommonLanguageTerm
