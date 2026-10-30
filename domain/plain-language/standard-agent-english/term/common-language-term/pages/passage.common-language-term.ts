import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const passage = {
  id: "01a18d5b-2058-74a8-97d0-2bb7a6d0c264",
  type: "page-type/common-language-term",
  slug: "passage",
  definition: "a part of a text",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "passage" },
    { partOfSpeech: "part-of-speech/noun", spelling: "passages" },
  ],
  createdAt: "2026-10-30T15:08:41.943Z",
  updatedAt: "2026-10-30T15:08:41.943Z",
} as const satisfies CommonLanguageTerm
