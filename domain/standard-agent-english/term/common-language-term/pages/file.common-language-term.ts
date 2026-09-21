import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const file = {
  id: "01a0c600-cf02-7244-a9de-8db354e5826c",
  type: "page-type/common-language-term",
  slug: "file",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "file" },
    { partOfSpeech: "part-of-speech/noun", spelling: "files" },
  ],
} as const satisfies CommonLanguageTerm
