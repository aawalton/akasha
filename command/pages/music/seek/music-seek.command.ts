import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicSeek = {
  id: "01a0a021-9251-7e44-81d1-54a35f38c12c",
  type: "page-type/command",
  slug: "music-seek",
  definition: "the command moving the playing track to a point counted from its opening",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A point said in seconds reaches Spotify in milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no point is refused rather than moving anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device named on the command line is moved rather than the active device.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move is handed in, so no test of it reaches Spotify.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "seek",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/device-id" },
    { argument: "argument/seconds", required: true, saidAs: "word" },
  ],
  createdAt: "2026-09-14T13:35:49.841Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Command
