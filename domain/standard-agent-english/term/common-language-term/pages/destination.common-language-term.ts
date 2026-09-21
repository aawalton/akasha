import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const destination = {
  id: "01a0c625-d6d4-7481-b21c-649eb10eec52",
  type: "page-type/common-language-term",
  slug: "destination",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "destination" },
    { partOfSpeech: "part-of-speech/noun", spelling: "destinations" },
  ],
} as const satisfies CommonLanguageTerm
