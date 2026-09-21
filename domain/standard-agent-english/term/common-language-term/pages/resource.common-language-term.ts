import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const resource = {
  id: "01a0c628-4592-7e08-95b6-5f53cf0bc907",
  type: "page-type/common-language-term",
  slug: "resource",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "resource" },
    { partOfSpeech: "part-of-speech/noun", spelling: "resources" },
  ],
} as const satisfies CommonLanguageTerm
