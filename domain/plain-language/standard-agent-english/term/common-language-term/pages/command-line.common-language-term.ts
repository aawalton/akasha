import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commandLine = {
  id: "01a18db7-e393-7bce-8adc-00ba409ba88e",
  type: "page-type/common-language-term",
  slug: "command-line",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "command line" },
    { partOfSpeech: "part-of-speech/noun", spelling: "command lines" },
  ],
  createdAt: "2026-10-30T16:50:01.233Z",
  updatedAt: "2026-10-30T16:50:01.233Z",
} as const satisfies CommonLanguageTerm
