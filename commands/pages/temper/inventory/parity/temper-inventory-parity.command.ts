import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryParity = {
  id: "01a0603c-c1d6-73fa-8ab1-b6d5deb216e2",
  type: "command",
  slug: "temper-inventory-parity",
  definition: "the command ruling whether the addon's trace of an item matches a fresh evaluation",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<item-id>", takes: "the item whose stored trace is compared" },
    { said: "--char <id>", takes: "the character the stored trace was captured from" },
    {
      said: "--inventory-path <path>",
      takes: "the saved-variables file the holdings are read from",
    },
    {
      said: "--characters-path <path>",
      takes: "the saved-variables file the characters are read from",
    },
  ],

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
} as const satisfies Command
