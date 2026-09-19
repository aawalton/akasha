import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicTypeTracks = {
  id: "01a0c204-6d31-7e88-b0a4-51fe3c7a9d62",
  type: "page-type/command",
  slug: "music-type-tracks",
  definition: "the command stating on a track the kind of recording its title names",
  code: "ts",
  test: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track is read, and only a track whose kind would change is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says how many tracks it left for the next run.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify or MusicBrainz.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This command is run again whenever the reading of a title changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track changed lands as a single commit or does not land.",
    },
  ],
  name: "type-tracks",
  arguments: [{ argument: "argument/json" }, { argument: "argument/limit" }],
} as const satisfies Command
