import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const lookup = {
  id: "01a0c628-fcd3-7269-adac-bb0d18162b76",
  type: "page-type/common-language-term",
  slug: "lookup",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "lookup" },
    { partOfSpeech: "part-of-speech/noun", spelling: "lookups" },
  ],
} as const satisfies CommonLanguageTerm
