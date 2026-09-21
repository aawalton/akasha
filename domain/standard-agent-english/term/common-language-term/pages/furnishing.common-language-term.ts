import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const furnishing = {
  id: "01a0c62e-1155-7936-a1d5-261fa65dedd1",
  type: "page-type/common-language-term",
  slug: "furnishing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "furnishing" },
    { partOfSpeech: "part-of-speech/noun", spelling: "furnishings" },
  ],
} as const satisfies CommonLanguageTerm
