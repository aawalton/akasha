import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const device = {
  id: "01a0d5b8-6729-741e-af49-51010e890889",
  type: "page-type/common-language-term",
  slug: "device",
  definition: "a machine made for a task",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "device" },
    { partOfSpeech: "part-of-speech/noun", spelling: "devices" },
  ],
  createdAt: "2026-09-24T23:20:27.177Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
