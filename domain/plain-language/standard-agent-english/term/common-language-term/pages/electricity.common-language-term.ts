import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const electricity = {
  id: "01a18d5f-749c-70d8-83cb-ea1ff1a717a7",
  type: "page-type/common-language-term",
  slug: "electricity",
  definition: "electric power",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "electricity" }],
  createdAt: "2026-10-30T15:13:25.658Z",
  updatedAt: "2026-10-30T15:13:25.658Z",
} as const satisfies CommonLanguageTerm
