import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const environmentVariable = {
  id: "01a18d48-107d-73b3-8b79-1d67652e431c",
  type: "page-type/common-language-term",
  slug: "environment-variable",
  definition: "a name and a value a process starts with",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "environment variable" },
    { partOfSpeech: "part-of-speech/noun", spelling: "environment variables" },
  ],
  createdAt: "2026-10-30T14:47:52.701Z",
  updatedAt: "2026-10-30T14:47:52.701Z",
} as const satisfies CommonLanguageTerm
