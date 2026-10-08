import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const tmux = {
  id: "01a0ddea-66cd-7bed-aa1b-1dc5841cde2c",
  type: "page-type/domain",
  slug: "tmux",
  definition: "a program that keeps a terminal's sessions running after the terminal closes",
  spellings: [
    { partOfSpeech: "part-of-speech/proper-noun", spelling: "tmux" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tmux session" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tmux sessions" },
  ],
  createdAt: "2026-09-26T13:32:01.613Z",
  updatedAt: "2026-09-26T13:32:04.000Z",
} as const satisfies Domain
