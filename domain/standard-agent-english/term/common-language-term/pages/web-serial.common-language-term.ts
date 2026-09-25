import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const webSerial = {
  id: "01a0d8ab-914f-7403-a951-1fcbdf3033f0",
  type: "page-type/common-language-term",
  slug: "web-serial",
  definition: "a story put out online one chapter at a time",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "web serial" },
    { partOfSpeech: "part-of-speech/noun", spelling: "web serials" },
  ],
} as const satisfies CommonLanguageTerm
