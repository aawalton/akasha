import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicUpcoming = {
  id: "01a0a02b-2231-768e-9e62-b714e56d0aed",
  type: "page-type/command",
  slug: "music-upcoming",
  definition: "the command naming the track Spotify plays now and the tracks queued behind it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The track playing now is named before the tracks queued behind it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A queue holding nothing is said rather than left out of the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing playing is said rather than leaving the first line off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is handed in, so no test of it reaches Spotify.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The queue is read from the account rather than from a device.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes what is playing.",
    },
  ],
  name: "upcoming",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
