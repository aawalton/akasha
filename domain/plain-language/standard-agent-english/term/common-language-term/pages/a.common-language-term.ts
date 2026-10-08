import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const a = {
  id: "01a0c583-1734-7a62-9999-1422865923ab",
  type: "page-type/common-language-term",
  slug: "a",
  definition: "the determiner written where the reader cannot yet tell which thing is named",
  spellings: [
    { partOfSpeech: "part-of-speech/determiner", spelling: "a" },
    { partOfSpeech: "part-of-speech/determiner", spelling: "an" },
  ],
  createdAt: "2026-09-21T19:48:17.844Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
