import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const website = {
  id: "01a0d894-bf0e-7014-92f9-5a1e595cd490",
  type: "page-type/common-language-term",
  slug: "website",
  definition: "pages a browser shows at one address",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "website" },
    { partOfSpeech: "part-of-speech/noun", spelling: "websites" },
  ],
  createdAt: "2026-09-25T12:40:22.030Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
