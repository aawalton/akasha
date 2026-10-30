import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const lock = {
  id: "01a18d4c-6134-75eb-92c5-762f3b241c69",
  type: "page-type/common-language-term",
  slug: "lock",
  definition: "something only one holder has at a time, keeping every other holder out",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "lock" },
    { partOfSpeech: "part-of-speech/noun", spelling: "locks" },
  ],
  createdAt: "2026-10-30T14:52:35.507Z",
  updatedAt: "2026-10-30T14:52:35.507Z",
} as const satisfies CommonLanguageTerm
