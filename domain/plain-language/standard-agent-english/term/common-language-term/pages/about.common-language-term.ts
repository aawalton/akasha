import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const about = {
  id: "01a0d48f-dc48-730d-926a-23d924873fd1",
  type: "page-type/common-language-term",
  slug: "about",
  definition: "on the subject of",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "about" }],
} as const satisfies CommonLanguageTerm
