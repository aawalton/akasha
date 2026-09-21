import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const boss = {
  id: "01a0c629-0fc6-7dba-95c2-5c76e7922318",
  type: "page-type/common-language-term",
  slug: "boss",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "boss" },
    { partOfSpeech: "part-of-speech/noun", spelling: "bosses" },
  ],
} as const satisfies CommonLanguageTerm
