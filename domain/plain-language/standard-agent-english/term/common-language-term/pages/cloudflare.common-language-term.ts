import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const cloudflare = {
  id: "01a18d82-e19f-734a-afa2-bd842f3c75c1",
  type: "page-type/common-language-term",
  slug: "cloudflare",
  definition: "a company that serves and guards websites and routes their email",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Cloudflare" }],
  createdAt: "2026-10-30T15:52:07.325Z",
  updatedAt: "2026-10-30T15:52:07.325Z",
} as const satisfies CommonLanguageTerm
