import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const annoy = {
  id: "01a0d580-673a-7fe4-a99b-5b5c6e83f81a",
  type: "page-type/common-language-term",
  slug: "annoy",
  definition: "to make someone a little angry",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "annoy" },
    { partOfSpeech: "part-of-speech/verb", spelling: "annoys" },
  ],
} as const satisfies CommonLanguageTerm
