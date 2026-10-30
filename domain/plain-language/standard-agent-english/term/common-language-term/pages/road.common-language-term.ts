import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const road = {
  id: "01a18d48-cfbc-7f1a-ae7a-80971318fa1a",
  type: "page-type/common-language-term",
  slug: "road",
  definition: "a hard way built for cars to go on",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "road" },
    { partOfSpeech: "part-of-speech/noun", spelling: "roads" },
  ],
  createdAt: "2026-10-30T14:48:41.659Z",
  updatedAt: "2026-10-30T14:48:41.659Z",
} as const satisfies CommonLanguageTerm
