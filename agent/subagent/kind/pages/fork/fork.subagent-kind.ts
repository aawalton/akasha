import type { SubagentKind } from "akasha/agent/subagent/kind/subagent-kind.page-type.types.ts"

export const fork = {
  id: "01a0d8ec-83e1-7a10-88c9-2affda3b024e",
  type: "page-type/subagent-kind",
  slug: "fork",
  definition: "a subagent that starts with the whole conversation of its seat",
  dispatchedAs: "fork",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fork starts with the whole of its seat's context rather than with a prompt.",
    },
  ],
  createdAt: "2026-09-25T14:16:14.049Z",
  updatedAt: "2026-10-30T14:49:04.253Z",
} as const satisfies SubagentKind
