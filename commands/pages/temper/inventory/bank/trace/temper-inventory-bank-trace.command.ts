import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBankTrace = {
  id: "01a0603c-c1cf-7944-91f2-3c13783517fa",
  type: "command",
  slug: "temper-inventory-bank-trace",
  definition: "the command giving back a timing trace from one of the addon's banking sessions",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call saying no visit reads the most recent trace.",
    },
    {
      invariantKind: "departure",
      statement: "A visit is counted back from the most recent, which is visit one.",
    },
    {
      invariantKind: "departure",
      statement: "The answer names every visit kept by its time and its banking bag.",
    },
    {
      invariantKind: "departure",
      statement: "Each phase has its own time bracket.",
    },
    {
      invariantKind: "departure",
      statement: "The trace names the moves made and what the net-worth walk cost.",
    },
    {
      invariantKind: "departure",
      statement: "A file with no trace refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A visit past the ones kept refuses the call.",
    },
  ],
  name: "trace",
  arguments: [
    { argument: "argument/visit", default: "1" },
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
  ],
} as const satisfies Command
