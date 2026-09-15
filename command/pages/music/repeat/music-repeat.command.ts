import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicRepeat = {
  id: "01a0a029-748e-779a-a462-6cd1bf166536",
  type: "page-type/command",
  slug: "music-repeat",
  definition: "the command putting a Spotify device on playing the track or the queue again",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "`track`, `context` and `off` are the words taken, and another is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming none of them is refused rather than reading the state back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device named on the command line is put rather than the active device.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The putting is handed in, so no test of it reaches Spotify.",
    },
    {
      decisionKind: "decision-kind/absence",
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
