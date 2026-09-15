import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicSkip = {
  id: "01a0a01b-4ebe-7423-8d37-562cec9b1bc4",
  type: "command",
  slug: "music-skip",
  definition: "the command carrying Spotify on from the track playing to the one behind it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A device named on the command line is skipped on rather than the active device.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      invariantKind: "departure",
      statement: "The skip is handed in, so no test of it reaches Spotify.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "skip",
  arguments: [{ argument: "argument/json" }, { argument: "argument/device-id" }],
} as const satisfies Command
