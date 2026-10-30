import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const describe = {
  id: "01a18d48-d888-7cc9-a23c-e77959fccc61",
  type: "page-type/common-language-term",
  slug: "describe",
  definition: "to say in words what a thing is like",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "describe" },
    { partOfSpeech: "part-of-speech/verb", spelling: "describes" },
  ],
  createdAt: "2026-10-30T14:48:43.911Z",
  updatedAt: "2026-10-30T14:48:43.911Z",
} as const satisfies CommonLanguageTerm
