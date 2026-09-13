import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const changeSubagent = {
  id: "01a09c36-a09c-75e0-ab57-9febb4e5a990",
  type: "namespace",
  slug: "change-subagent",
  definition: "the records a seat keeps for the subagents under it",
  parts: [
    "command/change-subagent-drop",
    "command/change-subagent-list",
    "command/change-subagent-show",
    "module/subagent-edits-acting",
  ],
  name: "subagent",
} as const satisfies Namespace
