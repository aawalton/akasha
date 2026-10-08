import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryAutomationList = {
  id: "01a0603c-c1ce-749d-a434-9035b90e6e37",
  type: "page-type/command",
  slug: "temper-inventory-automation-list",
  definition: "the command giving back the automation toggles as they are set",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every scope is reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope is the global one, one character or one companion.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes a toggle.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }],
  createdAt: "2026-09-02T03:49:49.646Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Command
