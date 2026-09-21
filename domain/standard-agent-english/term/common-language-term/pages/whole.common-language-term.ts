import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const whole = {
  id: "01a0c5f9-7563-7860-9634-0a8e656af6dc",
  type: "page-type/common-language-term",
  slug: "whole",
  definition: "the adjective naming a thing taken with every part that thing has",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "whole" }],
} as const satisfies CommonLanguageTerm
