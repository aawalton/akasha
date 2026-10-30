import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermPublic = {
  id: "01a18d52-211c-775a-ac50-8629ff1a26a6",
  type: "page-type/common-language-term",
  slug: "common-language-term-public",
  definition: "open for anyone to use",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "public" }],
  createdAt: "2026-10-30T14:58:52.315Z",
  updatedAt: "2026-10-30T14:58:52.315Z",
} as const satisfies CommonLanguageTerm
