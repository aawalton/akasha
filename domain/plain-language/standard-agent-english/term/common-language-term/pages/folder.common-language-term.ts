import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const folder = {
  id: "01a0d8c1-9a73-76b0-826d-773eeee5f621",
  type: "page-type/common-language-term",
  slug: "folder",
  definition: "a place that holds files and other folders",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "folder" },
    { partOfSpeech: "part-of-speech/noun", spelling: "folders" },
  ],
} as const satisfies CommonLanguageTerm
