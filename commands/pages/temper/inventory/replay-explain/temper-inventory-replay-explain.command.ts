import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryReplayExplain = {
  id: "01a0603c-c1d6-752a-86f1-3c9eca4b7916",
  type: "command",
  slug: "temper-inventory-replay-explain",
  definition: "the command giving back the addon's last stored explain trace",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trace given back is the trace the addon stored.",
    },
    {
      invariantKind: "departure",
      statement: "An item link the stored trace does not carry refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the item the stored trace has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here evaluates a rule.",
    },
  ],
  name: "replay-explain",
  arguments: [{ argument: "argument/inventory-path" }, { argument: "argument/itemlink" }],
} as const satisfies Command
