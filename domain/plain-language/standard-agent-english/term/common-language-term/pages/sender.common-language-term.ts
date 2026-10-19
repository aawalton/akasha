import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sender = {
  id: "01a15568-9f94-7cb1-98ed-c4ead4518837",
  type: "page-type/common-language-term",
  slug: "sender",
  definition: "something that sends a message",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "sender" },
    { partOfSpeech: "part-of-speech/noun", spelling: "senders" },
  ],
  createdAt: "2026-10-19T18:24:42.387Z",
  updatedAt: "2026-10-19T18:24:42.387Z",
} as const satisfies CommonLanguageTerm
