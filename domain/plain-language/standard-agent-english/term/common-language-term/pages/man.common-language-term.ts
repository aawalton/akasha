import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const man = {
  id: "01a18d92-4400-72a3-8b78-2ac9261182bd",
  type: "page-type/common-language-term",
  slug: "man",
  definition: "a grown male person",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "man" },
    { partOfSpeech: "part-of-speech/noun", spelling: "men" },
  ],
  createdAt: "2026-10-30T16:08:55.550Z",
  updatedAt: "2026-10-30T16:08:55.550Z",
} as const satisfies CommonLanguageTerm
