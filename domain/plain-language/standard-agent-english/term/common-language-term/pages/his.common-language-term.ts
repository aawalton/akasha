import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const his = {
  id: "01a0d8b5-edfc-7c90-ac23-888fdbc51ea1",
  type: "page-type/common-language-term",
  slug: "his",
  definition: "belonging to him",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "his" }],
} as const satisfies CommonLanguageTerm
