import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const start = {
  id: "01a0d3ed-28d3-770c-84aa-7923cf618fad",
  type: "page-type/common-language-term",
  slug: "start",
  definition: "setting a thing going",
  spellings: [{ partOfSpeech: "part-of-speech/past-participle", spelling: "started" }],
} as const satisfies CommonLanguageTerm
