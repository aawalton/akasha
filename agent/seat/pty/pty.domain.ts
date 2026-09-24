import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pty = {
  id: "01a0932f-f8ee-7c96-8069-edc7cda2dc6d",
  type: "page-type/domain",
  slug: "pty",
  definition: "a terminal a program runs",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "pty" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pseudo-terminal" },
  ],
  parts: [
    "module/bun-pty",
    "module/pty-proxy",
    "module/pty-proxy-detector",
    "module/pty-terminal-death",
  ],
} as const satisfies Domain
