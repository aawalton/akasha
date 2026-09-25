import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const much = {
  id: "01a0d913-bf0b-7557-a187-fc8878af7c2d",
  type: "page-type/common-language-term",
  slug: "much",
  definition: "a large amount of",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "much" }],
} as const satisfies CommonLanguageTerm
