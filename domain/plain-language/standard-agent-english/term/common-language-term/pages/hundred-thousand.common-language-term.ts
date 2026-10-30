import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hundredThousand = {
  id: "01a18d93-26bf-77ee-83dc-906f3ac3ae45",
  type: "page-type/common-language-term",
  slug: "hundred-thousand",
  definition: "the number a hundred times a thousand",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "hundred thousand" }],
  createdAt: "2026-10-30T16:09:53.597Z",
  updatedAt: "2026-10-30T16:09:53.597Z",
} as const satisfies CommonLanguageTerm
