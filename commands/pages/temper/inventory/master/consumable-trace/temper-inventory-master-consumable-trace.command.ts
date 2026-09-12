import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryMasterConsumableTrace = {
  id: "01a0603c-c1d5-7627-a06a-0889a2e23e44",
  type: "command",
  slug: "temper-inventory-master-consumable-trace",
  definition: "the command giving back the addon's ring of consumable master-writ traces",
  code: "ts",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the traces are read from" },
    { said: "--json", takes: "give the whole ring as JSON rather than as text" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ring has a bounded count of traces.",
    },
    {
      invariantKind: "departure",
      statement: "The oldest trace goes when a new trace arrives.",
    },
    {
      invariantKind: "departure",
      statement: "A trace names the phase it was taken in, resolve or execute.",
    },
    {
      invariantKind: "departure",
      statement:
        "A trace for alchemy, enchanting or provisioning has that craft's own facts beside the shared ones.",
    },
    {
      invariantKind: "departure",
      statement: "Each trace has the writ's outcome.",
    },
  ],
  name: "consumable-trace",
} as const satisfies Command
