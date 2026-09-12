import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryDecodeLink = {
  id: "01a0603c-c1d2-7be2-8f61-08de3fd69b48",
  type: "command",
  slug: "temper-inventory-decode-link",
  definition: "the command reading a game item link into its named fields",
  code: "ts",
  test: "ts",
  taking: [
    { said: "<link>", takes: "the game item link read" },
    { said: "--json", takes: "give the fields as JSON rather than as tab-separated rows" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A link has twenty-one fields after its item marker.",
    },
    {
      invariantKind: "departure",
      statement: "A link carrying fewer refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A link with more fields is read rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A link naming no item marker refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The fields are named beside their values.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
  name: "decode-link",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
