import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryBankProfile = {
  id: "01a0603c-c1ce-74dd-8c14-84a8dc5bd418",
  type: "page-type/command",
  slug: "temper-inventory-bank-profile",
  definition: "the command giving back the profiler capture from the addon's last banking session",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The capture read is the most recent capture.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The capture rolls up cost by source.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The capture names the costliest closures by inclusive time and by self time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Time in Lua is reported apart from time collecting garbage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file with no capture refuses the call.",
    },
  ],
  name: "profile",
  arguments: [{ argument: "argument/json" }, { argument: "argument/inventory-path" }],
} as const satisfies Command
