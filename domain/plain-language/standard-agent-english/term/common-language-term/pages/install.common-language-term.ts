import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const install = {
  id: "01a18d40-6f83-7bda-9767-6c5e027bf579",
  type: "page-type/common-language-term",
  slug: "install",
  definition: "putting a program where it can run",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "install" },
    { partOfSpeech: "part-of-speech/verb", spelling: "installs" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "installed" },
  ],
  createdAt: "2026-10-30T14:39:32.738Z",
  updatedAt: "2026-10-30T14:39:32.738Z",
} as const satisfies CommonLanguageTerm
