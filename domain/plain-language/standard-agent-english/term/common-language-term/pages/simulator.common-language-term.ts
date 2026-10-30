import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const simulator = {
  id: "01a18d78-c010-7b12-9924-eb465f50db34",
  type: "page-type/common-language-term",
  slug: "simulator",
  definition: "a program on a computer that runs the apps of a phone",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "simulator" },
    { partOfSpeech: "part-of-speech/noun", spelling: "simulators" },
  ],
  createdAt: "2026-10-30T15:41:03.374Z",
  updatedAt: "2026-10-30T15:41:03.374Z",
} as const satisfies CommonLanguageTerm
