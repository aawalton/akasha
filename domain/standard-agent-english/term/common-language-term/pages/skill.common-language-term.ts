import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const skill = {
  id: "01a0c624-1c0f-7575-9628-169dc53743bf",
  type: "page-type/common-language-term",
  slug: "skill",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "skill" },
    { partOfSpeech: "part-of-speech/noun", spelling: "skills" },
  ],
} as const satisfies CommonLanguageTerm
