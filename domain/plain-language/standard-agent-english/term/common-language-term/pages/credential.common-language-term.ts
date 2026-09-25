import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const credential = {
  id: "01a0caa2-abce-7bb2-b985-38526c85b709",
  type: "page-type/common-language-term",
  slug: "credential",
  definition: "what somebody holds and presents to be let in",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "credential" },
    { partOfSpeech: "part-of-speech/noun", spelling: "credentials" },
  ],
} as const satisfies CommonLanguageTerm
