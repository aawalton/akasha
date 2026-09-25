import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const happen = {
  id: "01a0d5c4-f7a5-73fb-92ad-ff6786a7f961",
  type: "page-type/common-language-term",
  slug: "happen",
  definition: "to take place",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "happen" },
    { partOfSpeech: "part-of-speech/verb", spelling: "happens" },
  ],
} as const satisfies CommonLanguageTerm
