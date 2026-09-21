import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const browser = {
  id: "01a0c62d-30c1-70fc-9950-9386aee1ad65",
  type: "page-type/common-language-term",
  slug: "browser",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "browser" },
    { partOfSpeech: "part-of-speech/noun", spelling: "browsers" },
  ],
} as const satisfies CommonLanguageTerm
