import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const iosSimulator = {
  id: "01a18d88-406e-76b0-95cc-34e1ea41b60a",
  type: "page-type/common-language-term",
  slug: "ios-simulator",
  definition: "the Apple app that runs a phone app on a computer",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "iOS Simulator" }],
  createdAt: "2026-10-30T15:57:59.276Z",
  updatedAt: "2026-10-30T15:57:59.276Z",
} as const satisfies CommonLanguageTerm
