import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const amazon = {
  id: "01a18d72-df97-795e-9085-83a99e8e2bde",
  type: "page-type/common-language-term",
  slug: "amazon",
  definition: "the company that sells things on its website",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Amazon" }],
  createdAt: "2026-10-30T15:34:38.230Z",
  updatedAt: "2026-10-30T15:34:38.230Z",
} as const satisfies CommonLanguageTerm
