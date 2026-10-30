import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const powertrain = {
  id: "01a18d49-ab24-787c-85b0-383efe344f73",
  type: "page-type/common-language-term",
  slug: "powertrain",
  definition: "the parts of a vehicle that make it move",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "powertrain" },
    { partOfSpeech: "part-of-speech/noun", spelling: "powertrains" },
  ],
  createdAt: "2026-10-30T14:49:37.827Z",
  updatedAt: "2026-10-30T14:49:37.827Z",
} as const satisfies CommonLanguageTerm
