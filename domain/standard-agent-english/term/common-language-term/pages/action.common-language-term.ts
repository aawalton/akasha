import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const action = {
  id: "01a0c628-6ab3-7b16-b730-e3d9900cc088",
  type: "page-type/common-language-term",
  slug: "action",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "action" },
    { partOfSpeech: "part-of-speech/noun", spelling: "actions" },
  ],
} as const satisfies CommonLanguageTerm
