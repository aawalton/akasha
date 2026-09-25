import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const port = {
  id: "01a0d9ca-21cf-754a-9353-84b9065c0f79",
  type: "page-type/common-language-term",
  slug: "port",
  definition: "the number a program is reached at on a machine",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "port" },
    { partOfSpeech: "part-of-speech/noun", spelling: "ports" },
  ],
} as const satisfies CommonLanguageTerm
