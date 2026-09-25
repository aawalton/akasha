import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const calendar = {
  id: "01a0d56f-a3ea-74f3-9f76-0fbfb7a5a166",
  type: "page-type/common-language-term",
  slug: "calendar",
  definition: "a record of what happens on which day",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "calendar" },
    { partOfSpeech: "part-of-speech/noun", spelling: "calendars" },
  ],
} as const satisfies CommonLanguageTerm
