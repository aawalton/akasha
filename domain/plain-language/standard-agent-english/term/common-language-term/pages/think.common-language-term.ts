import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const think = {
  id: "01a18da5-6e25-71f7-8fcd-4b597a487622",
  type: "page-type/common-language-term",
  slug: "think",
  definition: "use the mind",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "think" },
    { partOfSpeech: "part-of-speech/verb", spelling: "thinks" },
  ],
  createdAt: "2026-10-30T16:29:51.522Z",
  updatedAt: "2026-10-30T16:29:51.522Z",
} as const satisfies CommonLanguageTerm
