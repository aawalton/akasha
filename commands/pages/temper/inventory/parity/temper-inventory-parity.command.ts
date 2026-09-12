import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryParity = {
  id: "01a0603c-c1d6-73fa-8ab1-b6d5deb216e2",
  type: "command",
  slug: "temper-inventory-parity",
  definition: "the command ruling whether the addon's trace of an item matches a fresh evaluation",
  code: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The inputs are compared before the walks.",
    },
    {
      invariantKind: "departure",
      statement: "The character the trace was captured from is named on the call.",
    },
    {
      invariantKind: "departure",
      statement: "A stored trace for another item refuses the call.",
    },
  ],
  name: "parity",
  arguments: [
    { argument: "argument/inventory-path" },
    { argument: "argument/characters-path" },
    { argument: "argument/char", required: true },
    { argument: "argument/traced-item-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
