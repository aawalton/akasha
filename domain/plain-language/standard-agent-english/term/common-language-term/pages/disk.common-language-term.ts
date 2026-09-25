import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const disk = {
  id: "01a0d98f-7274-7769-b26c-b2e3c0cf07da",
  type: "page-type/common-language-term",
  slug: "disk",
  definition: "the part of a machine that keeps files when the power is off",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "disk" },
    { partOfSpeech: "part-of-speech/noun", spelling: "disks" },
  ],
} as const satisfies CommonLanguageTerm
