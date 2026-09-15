import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryMasterCraftTrace = {
  id: "01a0603c-c1d5-708e-bb42-aa873ff7864f",
  type: "page-type/command",
  slug: "temper-inventory-master-craft-trace",
  definition: "the command giving back the addon's ring of equipment master-writ craft traces",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ring has a bounded count of traces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The oldest trace goes when a new trace arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each trace has the station context, the pattern resolved and what verifying observed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each trace has the craft's outcome.",
    },
  ],
  name: "craft-trace",
  arguments: [{ argument: "argument/json" }, { argument: "argument/inventory-path" }],
} as const satisfies Command
