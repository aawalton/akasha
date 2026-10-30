import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const award = {
  id: "01a18d76-4591-7306-979e-be5b73cda2fb",
  type: "page-type/common-language-term",
  slug: "award",
  definition: "a mark of merit a body gives a thing it judged",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "award" },
    { partOfSpeech: "part-of-speech/noun", spelling: "awards" },
  ],
  createdAt: "2026-10-30T15:38:20.944Z",
  updatedAt: "2026-10-30T15:38:20.944Z",
} as const satisfies CommonLanguageTerm
