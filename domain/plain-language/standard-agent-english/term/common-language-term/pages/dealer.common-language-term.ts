import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const dealer = {
  id: "01a18d59-bf4c-7085-a04f-42c20a682ae6",
  type: "page-type/common-language-term",
  slug: "dealer",
  definition: "a business that sells cars to the people who drive them",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "dealer" },
    { partOfSpeech: "part-of-speech/noun", spelling: "dealers" },
  ],
  createdAt: "2026-10-30T15:07:11.562Z",
  updatedAt: "2026-10-30T15:07:11.562Z",
} as const satisfies CommonLanguageTerm
