import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const ageBand = {
  id: "01a18d8f-f9b3-7690-a358-4e03d09e8c8c",
  type: "page-type/common-language-term",
  slug: "age-band",
  definition: "a group of ages that deaths are counted under",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "age band" },
    { partOfSpeech: "part-of-speech/noun", spelling: "age bands" },
  ],
  createdAt: "2026-10-30T16:06:25.458Z",
  updatedAt: "2026-10-30T16:06:25.458Z",
} as const satisfies CommonLanguageTerm
