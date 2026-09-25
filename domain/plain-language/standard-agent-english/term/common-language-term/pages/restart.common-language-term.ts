import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const restart = {
  id: "01a0d41b-68d6-7761-8b5c-a73882eaa294",
  type: "page-type/common-language-term",
  slug: "restart",
  definition: "setting a thing going again after it stopped",
  spellings: [{ partOfSpeech: "part-of-speech/past-participle", spelling: "restarted" }],
} as const satisfies CommonLanguageTerm
