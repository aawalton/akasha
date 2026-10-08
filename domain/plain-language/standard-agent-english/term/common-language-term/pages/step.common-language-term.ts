import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const step = {
  id: "01a0d965-7a6f-7e87-8e56-2b1edc8fc796",
  type: "page-type/common-language-term",
  slug: "step",
  definition: "one of several things done in turn",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "step" },
    { partOfSpeech: "part-of-speech/noun", spelling: "steps" },
  ],
  createdAt: "2026-09-25T16:28:21.487Z",
  updatedAt: "2026-09-25T16:28:34.000Z",
} as const satisfies CommonLanguageTerm
