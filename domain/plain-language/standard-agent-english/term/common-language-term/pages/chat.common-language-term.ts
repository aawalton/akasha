import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const chat = {
  id: "01a0ca92-4066-773b-9235-5d0c15765cdd",
  type: "page-type/common-language-term",
  slug: "chat",
  definition: "trading short messages with somebody, back and forth",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "chat" },
    { partOfSpeech: "part-of-speech/verb", spelling: "chats" },
  ],
} as const satisfies CommonLanguageTerm
