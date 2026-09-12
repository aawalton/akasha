import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBankTrace = {
  id: "01a0603c-c1cf-7944-91f2-3c13783517fa",
  type: "command",
  slug: "temper-inventory-bank-trace",
  definition: "the command giving back the timing trace from the addon's last banking session",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the trace is read from" },
    { said: "--json", takes: "give the whole trace as JSON rather than as text" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trace read is the most recent trace.",
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
  ],
  name: "trace",
} as const satisfies Command
