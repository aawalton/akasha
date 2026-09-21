import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hook = {
  id: "01a0c629-a168-7e94-b901-88d2e26e43a4",
  type: "page-type/common-language-term",
  slug: "hook",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "hook" },
    { partOfSpeech: "part-of-speech/noun", spelling: "hooks" },
  ],
} as const satisfies CommonLanguageTerm
