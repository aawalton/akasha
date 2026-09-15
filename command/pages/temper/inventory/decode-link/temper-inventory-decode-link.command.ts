import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryDecodeLink = {
  id: "01a0603c-c1d2-7be2-8f61-08de3fd69b48",
  type: "page-type/command",
  slug: "temper-inventory-decode-link",
  definition: "the command reading a game item link into its named fields",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link has twenty-one fields after its item marker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link carrying fewer refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link with more fields is read rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link naming no item marker refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fields are named beside their values.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
  name: "decode-link",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/link", required: true, saidAs: "word" },
  ],
} as const satisfies Command
