import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const about = {
  id: "01a0d48f-dc48-730d-926a-23d924873fd1",
  type: "page-type/common-language-term",
  slug: "about",
  definition: "on the subject of",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "about" }],
  createdAt: "2026-09-24T17:56:32.968Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
