import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const timed = {
  id: "01a0d960-11db-70c5-aea6-ed63216081d9",
  type: "page-type/common-language-term",
  slug: "timed",
  definition: "with how long it took measured",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "timed" }],
} as const satisfies CommonLanguageTerm
