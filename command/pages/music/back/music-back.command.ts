import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicBack = {
  id: "01a0a01f-0b1f-7e5a-a12f-24d76abe10ed",
  type: "page-type/command",
  slug: "music-back",
  definition: "the command carrying Spotify back to the track before the one playing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A device named on the command line is carried back rather than the active one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The step back is handed in, so no test of it reaches Spotify.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "back",
  arguments: [{ argument: "argument/json" }, { argument: "argument/device-id" }],
} as const satisfies Command
