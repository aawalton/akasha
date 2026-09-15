import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicVolume = {
  id: "01a0a024-06ab-7ffa-baff-52d236353a00",
  type: "command",
  slug: "music-volume",
  definition: "the command setting how loud a Spotify device plays",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A percent past a hundred is refused rather than sent to Spotify.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no percent is refused rather than reading the loudness back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A device named on the command line is set rather than the active device.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The set is handed in, so no test of it reaches Spotify.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "volume",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/device-id" },
    { argument: "argument/percent", required: true, saidAs: "word" },
  ],
} as const satisfies Command
