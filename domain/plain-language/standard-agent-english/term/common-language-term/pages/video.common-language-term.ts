import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const video = {
  id: "01a0d974-20d9-7847-a41c-6fe9fd3f6265",
  type: "page-type/common-language-term",
  slug: "video",
  definition: "moving pictures kept as a file",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "video" },
    { partOfSpeech: "part-of-speech/noun", spelling: "videos" },
  ],
} as const satisfies CommonLanguageTerm
