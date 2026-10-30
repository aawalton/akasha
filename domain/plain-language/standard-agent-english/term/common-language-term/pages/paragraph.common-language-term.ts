import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const paragraph = {
  id: "01a18d48-1047-7334-b86d-d49588f7e05d",
  type: "page-type/common-language-term",
  slug: "paragraph",
  definition: "a few sentences written together about one point",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "paragraph" },
    { partOfSpeech: "part-of-speech/noun", spelling: "paragraphs" },
  ],
  createdAt: "2026-10-30T14:47:52.646Z",
  updatedAt: "2026-10-30T14:47:52.646Z",
} as const satisfies CommonLanguageTerm
