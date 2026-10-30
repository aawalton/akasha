import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const question = {
  id: "01a18d49-28a4-767c-a35b-cce31a479c4e",
  type: "page-type/common-language-term",
  slug: "question",
  definition: "a sentence that asks for an answer",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "question" },
    { partOfSpeech: "part-of-speech/noun", spelling: "questions" },
  ],
  createdAt: "2026-10-30T14:49:04.419Z",
  updatedAt: "2026-10-30T14:49:04.419Z",
} as const satisfies CommonLanguageTerm
