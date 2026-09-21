import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const setting = {
  id: "01a0c622-563f-7016-a516-eccfb2eca139",
  type: "page-type/common-language-term",
  slug: "setting",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "setting" },
    { partOfSpeech: "part-of-speech/noun", spelling: "settings" },
  ],
} as const satisfies CommonLanguageTerm
