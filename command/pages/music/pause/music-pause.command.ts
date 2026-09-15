import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicPause = {
  id: "01a0a018-8937-77ed-a694-31b894b07058",
  type: "command",
  slug: "music-pause",
  definition: "the command holding where it is the track Spotify is playing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A device named on the command line is held rather than the active device.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      invariantKind: "departure",
      statement: "The hold is handed in, so no test of it reaches Spotify.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "pause",
  arguments: [{ argument: "argument/json" }, { argument: "argument/device-id" }],
} as const satisfies Command
