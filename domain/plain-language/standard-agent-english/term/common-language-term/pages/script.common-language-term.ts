import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const script = {
  id: "01a18d77-bf57-7b4f-a918-d0044cfe0aef",
  type: "page-type/common-language-term",
  slug: "script",
  definition: "a file of shell steps",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "script" },
    { partOfSpeech: "part-of-speech/noun", spelling: "scripts" },
  ],
  createdAt: "2026-10-30T15:39:57.654Z",
  updatedAt: "2026-10-30T15:39:57.654Z",
} as const satisfies CommonLanguageTerm
