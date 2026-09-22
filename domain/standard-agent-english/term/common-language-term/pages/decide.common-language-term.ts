import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const decide = {
  id: "01a0ca4b-998f-7fb5-bc63-7683de8bb5ae",
  type: "page-type/common-language-term",
  slug: "decide",
  definition: "settling which one it is, as a rule or a count settles it",
  spellings: [{ partOfSpeech: "part-of-speech/past-participle", spelling: "decided" }],
} as const satisfies CommonLanguageTerm
