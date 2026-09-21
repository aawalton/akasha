import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicUngradedPlaylist = {
  id: "01a0c581-cb0b-72ae-8248-0563e0e9e4e8",
  type: "page-type/command",
  slug: "music-ungraded-playlist",
  definition:
    "the command keeping a playlist of what Alan has heard by his followed artists and not graded",
  code: "ts",
  maxWallSeconds: 1800,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracks picked are the tracks the ungraded-picking module picks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The playlist kept up to date is the one the `playlist/ungraded` page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The playlist-keeping module does everything else this command does.",
    },
  ],
  name: "ungraded-playlist",
  arguments: [{ argument: "argument/json" }, { argument: "argument/plan" }],
} as const satisfies Command
