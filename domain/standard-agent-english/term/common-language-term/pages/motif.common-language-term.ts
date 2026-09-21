import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const motif = {
  id: "01a0c62d-eb2f-7279-a48a-61b51673bc33",
  type: "page-type/common-language-term",
  slug: "motif",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "motif" },
    { partOfSpeech: "part-of-speech/noun", spelling: "motifs" },
  ],
} as const satisfies CommonLanguageTerm
