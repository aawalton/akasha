import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const expect = {
  id: "01a0d88b-c4ff-7ec7-88c9-4f920c335593",
  type: "page-type/common-language-term",
  slug: "expect",
  definition: "to think something will happen",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "expect" },
    { partOfSpeech: "part-of-speech/verb", spelling: "expects" },
  ],
} as const satisfies CommonLanguageTerm
