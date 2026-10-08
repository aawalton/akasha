import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const changeSubagent = {
  id: "01a09c36-a09c-75e0-ab57-9febb4e5a990",
  type: "page-type/namespace",
  slug: "change-subagent",
  definition: "the records a seat keeps for the subagents under it",
  parts: [
    "command/change-subagent-drop",
    "command/change-subagent-list",
    "command/change-subagent-show",
    "command/change-subagent-take",
    "module/subagent-edits-acting",
  ],
  name: "subagent",
  createdAt: "2026-09-13T19:20:20.892Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
