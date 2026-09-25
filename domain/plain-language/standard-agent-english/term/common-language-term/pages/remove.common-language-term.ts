import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const remove = {
  id: "01a0d8cd-1ad0-7ca6-8eaa-92a50630ff9d",
  type: "page-type/common-language-term",
  slug: "remove",
  definition: "to take away",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "remove" },
    { partOfSpeech: "part-of-speech/verb", spelling: "removes" },
  ],
} as const satisfies CommonLanguageTerm
