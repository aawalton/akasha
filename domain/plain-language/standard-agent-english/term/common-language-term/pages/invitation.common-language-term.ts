import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const invitation = {
  id: "01a18da8-2cdb-76bd-ad7e-c031c76817e5",
  type: "page-type/common-language-term",
  slug: "invitation",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "invitation" },
    { partOfSpeech: "part-of-speech/noun", spelling: "invitations" },
  ],
  createdAt: "2026-10-30T16:32:51.418Z",
  updatedAt: "2026-10-30T16:32:51.418Z",
} as const satisfies CommonLanguageTerm
