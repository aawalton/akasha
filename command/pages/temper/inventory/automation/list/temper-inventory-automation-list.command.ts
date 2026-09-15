import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryAutomationList = {
  id: "01a0603c-c1ce-749d-a434-9035b90e6e37",
  type: "command",
  slug: "temper-inventory-automation-list",
  definition: "the command giving back the automation toggles as they are set",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every scope is reported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scope is the global one, one character or one companion.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes a toggle.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
