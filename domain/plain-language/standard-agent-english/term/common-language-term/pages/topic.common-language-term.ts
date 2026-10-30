import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const topic = {
  id: "01a18d48-1293-764d-9984-079d31bc4798",
  type: "page-type/common-language-term",
  slug: "topic",
  definition: "a thing that is written or talked about",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "topic" },
    { partOfSpeech: "part-of-speech/noun", spelling: "topics" },
  ],
  createdAt: "2026-10-30T14:47:53.234Z",
  updatedAt: "2026-10-30T14:47:53.234Z",
} as const satisfies CommonLanguageTerm
