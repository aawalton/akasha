import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicQueue = {
  id: "01a062f9-5ca9-7196-a782-961170a78313",
  type: "command",
  slug: "music-queue",
  definition: "the command playing the first of a set of tracks and queueing the rest behind it",
  code: "ts",
  test: "ts",
  taking: [
    { said: "<query>...", takes: "one or more track queries, in the order they are played" },
    {
      said: "--artist <name>",
      takes: "hold every query to this artist, read without regard to case",
    },
    { said: "--device-id <id>", takes: "the Spotify device played on, rather than the active one" },
    { said: "--json", takes: "give the answer as JSON rather than as lines of text" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "Every query is resolved to a track before anything is played.",
    },
    {
      invariantKind: "departure",
      statement: "The first track begins playing the way `akasha music play` begins a track.",
    },
    {
      invariantKind: "departure",
      statement: "A track after the first is queued rather than played.",
    },
    {
      invariantKind: "departure",
      statement: "The tracks are queued in the order the queries were written.",
    },
    {
      invariantKind: "departure",
      statement: "An artist named has every query rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no query is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "queue",
} as const satisfies Command
