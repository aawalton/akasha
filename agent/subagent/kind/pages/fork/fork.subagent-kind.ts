import type { SubagentKind } from "akasha/agent/subagent/kind/subagent-kind.page-type.types.ts"

export const fork = {
  id: "01a0d8ec-83e1-7a10-88c9-2affda3b024e",
  type: "page-type/subagent-kind",
  slug: "fork",
  definition: "a subagent that carries on the conversation of the seat that ran it",
  dispatchedAs: "fork",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fork starts with the whole of its seat's context rather than with a prompt.",
    },
  ],
} as const satisfies SubagentKind
