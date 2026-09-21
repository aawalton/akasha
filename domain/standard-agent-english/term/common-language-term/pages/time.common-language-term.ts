import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const time = {
  id: "01a0c623-bd7f-747a-bc8d-0a8640f051f3",
  type: "page-type/common-language-term",
  slug: "time",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "time" },
    { partOfSpeech: "part-of-speech/noun", spelling: "times" },
  ],
} as const satisfies CommonLanguageTerm
