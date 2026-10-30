import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const license = {
  id: "01a18d58-5ea3-7803-97e1-228acf6ad247",
  type: "page-type/common-language-term",
  slug: "license",
  definition: "the terms a thing may be used on",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "license" },
    { partOfSpeech: "part-of-speech/noun", spelling: "licenses" },
  ],
  createdAt: "2026-10-30T15:05:41.282Z",
  updatedAt: "2026-10-30T15:05:41.282Z",
} as const satisfies CommonLanguageTerm
