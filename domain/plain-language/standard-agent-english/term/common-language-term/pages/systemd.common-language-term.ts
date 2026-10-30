import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const systemd = {
  id: "01a18d8c-afd3-7420-a49c-811b73d12898",
  type: "page-type/common-language-term",
  slug: "systemd",
  definition: "the program that runs the services of a computer",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "systemd" }],
  createdAt: "2026-10-30T16:02:49.937Z",
  updatedAt: "2026-10-30T16:02:49.937Z",
} as const satisfies CommonLanguageTerm
