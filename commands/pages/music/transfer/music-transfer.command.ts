import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicTransfer = {
  id: "01a0a02c-b833-7d5a-8f9c-f4ad8bddc830",
  type: "command",
  slug: "music-transfer",
  definition: "the command moving Spotify playback onto the devices a call names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every device said, at its flag or as a word, is moved to in one call.",
    },
    {
      invariantKind: "departure",
      statement: "The devices reach Spotify in the order the call wrote them.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no device is refused rather than moving anything.",
    },
    {
      invariantKind: "departure",
      statement: "`--play` is what starts the device moved to, and a call without it says none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      invariantKind: "departure",
      statement: "The move is handed in, so no test of it reaches Spotify.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "transfer",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/play" },
    {
      argument: "argument/device-id",
      required: true,
      repeats: true,
      saidAs: "flag-or-word",
    },
  ],
} as const satisfies Command
