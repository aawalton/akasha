import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const backgroundCommand = {
  id: "01a18d7d-b3d7-74cc-93c9-e0ab5bd3a3b4",
  type: "page-type/domain",
  slug: "background-command",
  definition: "a program Claude Code runs in a shell while its agent goes on working",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "background command" },
    { partOfSpeech: "part-of-speech/noun", spelling: "background commands" },
  ],
  createdAt: "2026-10-30T15:46:27.925Z",
  updatedAt: "2026-10-30T15:46:27.925Z",
} as const satisfies Domain
