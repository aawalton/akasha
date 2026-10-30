import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tree = {
  id: "01a18d4c-f780-7227-8d56-3b994f61d185",
  type: "page-type/common-language-term",
  slug: "tree",
  definition: "things set out so that each thing but the first sits under one other thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tree" },
    { partOfSpeech: "part-of-speech/noun", spelling: "trees" },
  ],
  createdAt: "2026-10-30T14:53:13.983Z",
  updatedAt: "2026-10-30T14:53:13.983Z",
} as const satisfies CommonLanguageTerm
