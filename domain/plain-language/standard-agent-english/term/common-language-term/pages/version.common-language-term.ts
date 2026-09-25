import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const version = {
  id: "01a0d954-69a2-741b-9599-e3f55fcd357c",
  type: "page-type/common-language-term",
  slug: "version",
  definition: "one form of something that changes over time",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "version" },
    { partOfSpeech: "part-of-speech/noun", spelling: "versions" },
  ],
} as const satisfies CommonLanguageTerm
