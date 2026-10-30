import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const poundFoot = {
  id: "01a18d68-4504-70ac-8823-8d78d93a39e9",
  type: "page-type/common-language-term",
  slug: "pound-foot",
  definition: "a unit of twisting force",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "pound-foot" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pound-feet" },
  ],
  createdAt: "2026-10-30T15:23:03.298Z",
  updatedAt: "2026-10-30T15:23:03.298Z",
} as const satisfies CommonLanguageTerm
