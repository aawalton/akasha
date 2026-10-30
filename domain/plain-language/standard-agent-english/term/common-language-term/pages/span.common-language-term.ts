import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const span = {
  id: "01a18da0-ad69-763c-ad29-1f7c7b7faf16",
  type: "page-type/common-language-term",
  slug: "span",
  definition: "the time between two instants",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "span" },
    { partOfSpeech: "part-of-speech/noun", spelling: "spans" },
  ],
  createdAt: "2026-10-30T16:24:40.040Z",
  updatedAt: "2026-10-30T16:24:40.040Z",
} as const satisfies CommonLanguageTerm
