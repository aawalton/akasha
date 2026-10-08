import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const thing = {
  id: "01a0d583-caca-71b5-ac02-1ea4440f553c",
  type: "page-type/common-language-term",
  slug: "thing",
  definition: "an object, act or idea",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "thing" },
    { partOfSpeech: "part-of-speech/noun", spelling: "things" },
  ],
  createdAt: "2026-09-24T22:22:59.274Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
