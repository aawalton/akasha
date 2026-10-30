import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const experiment = {
  id: "01a18d49-862b-78fb-8838-dc367fcd5629",
  type: "page-type/common-language-term",
  slug: "experiment",
  definition: "a trial done to find something out",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "experiment" },
    { partOfSpeech: "part-of-speech/noun", spelling: "experiments" },
  ],
  createdAt: "2026-10-30T14:49:28.362Z",
  updatedAt: "2026-10-30T14:49:28.362Z",
} as const satisfies CommonLanguageTerm
