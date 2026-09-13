import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryOutcomeParity = {
  id: "01a09b55-1b5c-74af-9384-4db91fda4e9b",
  type: "command",
  slug: "temper-inventory-outcome-parity",
  definition:
    "whether the outcome-only run reaches what the full run reaches, over every item held",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every item in every bag of every location is ruled on rather than a sample.",
    },
    {
      invariantKind: "departure",
      statement: "An indeterminate outcome is compared whole rather than counted.",
    },
    {
      invariantKind: "departure",
      statement: "One item disagreeing answers with that item rather than with a tally.",
    },
    {
      invariantKind: "absence",
      statement:
        "Neither run compared here is the addon's, so agreement is no sign the addon agrees.",
    },
    {
      invariantKind: "departure",
      statement: "Both runs read one env, so a signal that env lacks leaves the two runs alike.",
    },
  ],
  name: "outcome-parity",
  arguments: [{ argument: "argument/inventory-path" }, { argument: "argument/characters-path" }],
} as const satisfies Command
