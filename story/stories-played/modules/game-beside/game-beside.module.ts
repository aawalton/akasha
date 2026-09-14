import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const gameBeside = {
  id: "01a0a160-1d33-7b41-8c07-5f9a2e6b3d18",
  type: "module",
  slug: "game-beside",
  definition: "the game a played story shares a slug with, read with the files beside its page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game read is the one game whose slug is the played story's own slug.",
    },
    {
      invariantKind: "departure",
      statement: "A file property answering its own ending rather than a body reads as unread.",
    },
    {
      invariantKind: "departure",
      statement: "The state read is the last row of the file, which is the state play left.",
    },
    {
      invariantKind: "departure",
      statement: "A body no schema accepts reads as unread rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "A store that answers nothing is told apart from a story no game names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here polls, because no game behind these stories is still being played.",
    },
  ],
} as const satisfies Module
