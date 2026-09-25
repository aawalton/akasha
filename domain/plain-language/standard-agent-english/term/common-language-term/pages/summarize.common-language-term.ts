import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const summarize = {
  id: "01a0d448-7978-70f2-8ad1-416d1d55bdbf",
  type: "page-type/common-language-term",
  slug: "summarize",
  definition: "saying the main points of something in fewer words",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "summary" },
    { partOfSpeech: "part-of-speech/noun", spelling: "summaries" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "summarized" },
  ],
} as const satisfies CommonLanguageTerm
