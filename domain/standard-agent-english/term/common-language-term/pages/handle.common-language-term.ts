import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const handle = {
  id: "01a0d598-1bc7-7783-a685-e57b16545e86",
  type: "page-type/common-language-term",
  slug: "handle",
  definition: "to deal with something",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "handle" },
    { partOfSpeech: "part-of-speech/verb", spelling: "handles" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "handled" },
  ],
} as const satisfies CommonLanguageTerm
