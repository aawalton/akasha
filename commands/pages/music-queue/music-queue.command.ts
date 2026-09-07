import type { Command } from "@akasha/command-system/command"

export const musicQueue = {
  id: "01a062f9-5ca9-7196-a782-961170a78313",
  pageTypeSlug: "command",
  slug: "music-queue",
  definition: "the command playing the first of a set of tracks and queueing the rest behind it",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<query>...", takes: "one or more track queries, in the order they are played" },
    {
      said: "--artist <name>",
      takes: "hold every query to this artist, read without regard to case",
    },
    { said: "--device-id <id>", takes: "the Spotify device played on, rather than the active one" },
    { said: "--json", takes: "give the answer as JSON rather than as lines of text" },
  ],
  helpNotes: [
    "--artist holds every query at once, so name it only where one artist made the whole set.",
    "a query that no track answers refuses the call before anything is played or queued.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every query is resolved to a track before anything is played.",
    },
    {
      invariantKind: "departure",
      statement: "The first track begins playing the way `music-play` begins a track.",
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
      statement: "An artist named holds every query rather than the first alone.",
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
} as const satisfies Command
