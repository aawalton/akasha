import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const champion = {
  id: "01a0d920-6234-781b-a3b4-666bc5924cb1",
  type: "page-type/common-language-term",
  slug: "champion",
  definition: "to look after something and speak for it",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "champion" },
    { partOfSpeech: "part-of-speech/verb", spelling: "champions" },
  ],
} as const satisfies CommonLanguageTerm
