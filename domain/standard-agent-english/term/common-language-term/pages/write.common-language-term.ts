import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const write = {
  id: "01a0d435-bdab-783b-b4e0-3afede58019f",
  type: "page-type/common-language-term",
  slug: "write",
  definition: "putting words or values down where they are kept",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "write" },
    { partOfSpeech: "part-of-speech/verb", spelling: "writes" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "written" },
  ],
} as const satisfies CommonLanguageTerm
