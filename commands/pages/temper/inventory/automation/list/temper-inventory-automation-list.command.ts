import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryAutomationList = {
  id: "01a0603c-c1ce-749d-a434-9035b90e6e37",
  type: "command",
  slug: "temper-inventory-automation-list",
  definition: "the command giving back the automation toggles as they are set",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--json", takes: "give the whole shape as JSON rather than as tab-separated rows" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every scope is reported.",
    },
    {
      invariantKind: "departure",
      statement: "A scope is the global one, one character or one companion.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes a toggle.",
    },
  ],
  name: "list",
} as const satisfies Command
