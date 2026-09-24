import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const whole = {
  id: "01a0d5c0-af86-76f2-93fa-eb7371b0fa95",
  type: "page-type/common-language-term",
  slug: "whole",
  definition: "in its natural form, not broken down or refined",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "whole" }],
} as const satisfies CommonLanguageTerm
