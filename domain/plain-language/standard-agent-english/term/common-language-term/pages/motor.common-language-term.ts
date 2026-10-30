import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const motor = {
  id: "01a18d4d-8aef-7d4e-b09c-af11a3f469c0",
  type: "page-type/common-language-term",
  slug: "motor",
  definition: "a machine that turns energy into motion",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "motor" },
    { partOfSpeech: "part-of-speech/noun", spelling: "motors" },
  ],
  createdAt: "2026-10-30T14:53:51.726Z",
  updatedAt: "2026-10-30T14:53:51.726Z",
} as const satisfies CommonLanguageTerm
