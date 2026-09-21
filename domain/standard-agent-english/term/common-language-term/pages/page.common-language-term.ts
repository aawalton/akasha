import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const page = {
  id: "01a0c602-0f16-75e8-8b0c-f091b704a77d",
  type: "page-type/common-language-term",
  slug: "page",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "page" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pages" },
  ],
} as const satisfies CommonLanguageTerm
