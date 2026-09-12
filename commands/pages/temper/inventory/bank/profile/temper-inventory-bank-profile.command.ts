import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBankProfile = {
  id: "01a0603c-c1ce-74dd-8c14-84a8dc5bd418",
  type: "command",
  slug: "temper-inventory-bank-profile",
  definition: "the command giving back the profiler capture from the addon's last banking session",
  code: "ts",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the capture is read from" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The capture read is the most recent capture.",
    },
    {
      invariantKind: "departure",
      statement: "The capture rolls up cost by source.",
    },
    {
      invariantKind: "departure",
      statement: "The capture names the costliest closures by inclusive time and by self time.",
    },
    {
      invariantKind: "departure",
      statement: "Time in Lua is reported apart from time collecting garbage.",
    },
    {
      invariantKind: "departure",
      statement: "A file with no capture refuses the call.",
    },
  ],
  name: "profile",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
