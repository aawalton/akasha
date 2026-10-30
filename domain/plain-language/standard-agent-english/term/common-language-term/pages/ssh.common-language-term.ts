import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const ssh = {
  id: "01a18d7d-360b-7246-bb88-dc01b5a21eb7",
  type: "page-type/common-language-term",
  slug: "ssh",
  definition: "how code on a computer reaches another computer",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "SSH" }],
  createdAt: "2026-10-30T15:45:55.722Z",
  updatedAt: "2026-10-30T15:45:55.722Z",
} as const satisfies CommonLanguageTerm
