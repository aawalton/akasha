import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const charger = {
  id: "01a18d51-abfb-7c44-adf3-148f0f095c39",
  type: "page-type/common-language-term",
  slug: "charger",
  definition: "a device that puts power into a battery",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "charger" },
    { partOfSpeech: "part-of-speech/noun", spelling: "chargers" },
  ],
  createdAt: "2026-10-30T14:58:22.329Z",
  updatedAt: "2026-10-30T14:58:22.329Z",
} as const satisfies CommonLanguageTerm
