import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const set = {
  id: "01a0cab2-aeff-77e8-9769-5c4a76421a30",
  type: "page-type/common-language-term",
  slug: "set",
  definition: "put to the value somebody decided on, or a group of things taken together",
  spellings: [
    { partOfSpeech: "part-of-speech/past-participle", spelling: "set" },
    { partOfSpeech: "part-of-speech/noun", spelling: "set" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sets" },
  ],
} as const satisfies CommonLanguageTerm
