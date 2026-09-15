import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicRepeat = {
  id: "01a0a029-748e-779a-a462-6cd1bf166536",
  type: "command",
  slug: "music-repeat",
  definition: "the command putting a Spotify device on playing the track or the queue again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "`track`, `context` and `off` are the words taken, and another is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming none of them is refused rather than reading the state back.",
    },
    {
      invariantKind: "departure",
      statement: "A device named on the command line is put rather than the active device.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      invariantKind: "departure",
      statement: "The putting is handed in, so no test of it reaches Spotify.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "repeat",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/device-id" },
    { argument: "argument/repeat-state", required: true, saidAs: "word" },
  ],
} as const satisfies Command
