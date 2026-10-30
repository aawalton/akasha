import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const testflight = {
  id: "01a18d7d-57fe-7041-8568-2942211e75de",
  type: "page-type/common-language-term",
  slug: "testflight",
  definition: "a service that gives an iOS app to people before its release",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "TestFlight" }],
  createdAt: "2026-10-30T15:46:04.412Z",
  updatedAt: "2026-10-30T15:46:04.412Z",
} as const satisfies CommonLanguageTerm
