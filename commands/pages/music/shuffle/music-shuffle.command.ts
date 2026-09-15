import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicShuffle = {
  id: "01a0a028-06be-7e85-a38c-8e1253d467de",
  type: "command",
  slug: "music-shuffle",
  definition: "the command putting a Spotify device on drawing its tracks at random",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "`on` and `off` are the words the command takes, and another is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming neither word is refused rather than reading the state back.",
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
  name: "shuffle",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/device-id" },
    { argument: "argument/shuffle-state", required: true, saidAs: "word" },
  ],
} as const satisfies Command
