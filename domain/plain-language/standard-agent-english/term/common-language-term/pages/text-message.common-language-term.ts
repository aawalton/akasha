import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const textMessage = {
  id: "01a18d91-2621-78c1-9dcd-e5cd33feef50",
  type: "page-type/common-language-term",
  slug: "text-message",
  definition: "a short message sent to a phone",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "text message" },
    { partOfSpeech: "part-of-speech/noun", spelling: "text messages" },
  ],
  createdAt: "2026-10-30T16:07:42.368Z",
  updatedAt: "2026-10-30T16:07:42.368Z",
} as const satisfies CommonLanguageTerm
