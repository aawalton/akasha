import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryBankTrace = {
  id: "01a0603c-c1cf-7944-91f2-3c13783517fa",
  type: "page-type/command",
  slug: "temper-inventory-bank-trace",
  definition: "the command giving back a timing trace from one of the addon's banking sessions",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying no visit reads the most recent trace.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A visit is counted back from the most recent, which is visit one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer names every visit kept by its time and its banking bag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each phase has its own time bracket.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The trace names the moves made and what the net-worth walk cost.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each move a settle left unconfirmed is named under the round that left it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A move named says how much of its source stack moved and how much room its target had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file with no trace refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
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
