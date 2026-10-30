import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermPackage = {
  id: "01a18d40-6f83-71a1-8bf9-d0b7f25ad45c",
  type: "page-type/common-language-term",
  slug: "common-language-term-package",
  definition: "code published under a name for other code to install",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "package" },
    { partOfSpeech: "part-of-speech/noun", spelling: "packages" },
  ],
  createdAt: "2026-10-30T14:39:32.738Z",
  updatedAt: "2026-10-30T14:39:32.738Z",
} as const satisfies CommonLanguageTerm
