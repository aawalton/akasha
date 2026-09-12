import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryMasterCraftTrace = {
  id: "01a0603c-c1d5-708e-bb42-aa873ff7864f",
  type: "command",
  slug: "temper-inventory-master-craft-trace",
  definition: "the command giving back the addon's ring of equipment master-writ craft traces",
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
      statement:
        "Each trace has the station context, the pattern resolved and what verifying observed.",
    },
    {
      invariantKind: "departure",
      statement: "Each trace has the craft's outcome.",
    },
  ],
  name: "craft-trace",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
