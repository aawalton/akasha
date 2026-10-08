import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicUnheardPlaylist = {
  id: "01a0c4ef-8b59-7e55-8995-fc004869dc1f",
  type: "page-type/command",
  slug: "music-unheard-playlist",
  definition:
    "the command keeping a playlist of what Alan's followed artists made and he has not heard",
  code: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracks picked are the tracks the unheard-picking module picks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The playlist kept up to date is the one the `playlist/unheard` page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The playlist-keeping module does everything else this command does.",
    },
  ],
  name: "unheard-playlist",
  arguments: [{ argument: "argument/json" }, { argument: "argument/plan" }],
  createdAt: "2026-09-21T17:07:08.249Z",
  updatedAt: "2026-09-21T19:47:25.000Z",
} as const satisfies Command
