import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const cubicFoot = {
  id: "01a18d4e-95c1-7bda-9386-9df6ff1edfcd",
  type: "page-type/common-language-term",
  slug: "cubic-foot",
  definition: "the space a cube one foot on each side fills",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "cubic foot" },
    { partOfSpeech: "part-of-speech/noun", spelling: "cubic feet" },
  ],
  createdAt: "2026-10-30T14:55:00.032Z",
  updatedAt: "2026-10-30T14:55:00.032Z",
} as const satisfies CommonLanguageTerm
