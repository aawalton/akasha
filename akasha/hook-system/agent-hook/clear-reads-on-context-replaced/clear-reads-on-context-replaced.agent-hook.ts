import type { AgentHook } from "../agent-hook.page-type.ts"

export const clearReadsOnContextReplaced = {
  id: "01a04fa8-2878-7000-ab4d-25b94a3d14f6",
  pageTypeSlug: "agent-hook",
  slug: "clear-reads-on-context-replaced",
  definition: "a clearing of an agent's readings when its context is replaced rather than resumed",
  code: "ts",
  test: "ts",
  runsAt: ["SessionStart"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A context replaced holds none of what was read into it.",
    },
    {
      invariantKind: "departure",
      statement: "A resumed session keeps its readings.",
    },
    {
      invariantKind: "departure",
      statement: "A startup and a clearing and a compaction each replace the context.",
    },
    {
      invariantKind: "departure",
      statement: "Each clears the record.",
    },
    {
      invariantKind: "departure",
      statement: "One agent's readings are cleared rather than another's.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's subagents' records go when the seat's context is replaced.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing else takes a seat's subagents' records away.",
    },
    {
      invariantKind: "departure",
      statement: "With no agent named nothing is cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A record that cannot be reached is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "The session begins either way.",
    },
    {
      invariantKind: "departure",
      statement: "This hook changes the record rather than judging a call.",
    },
    {
      invariantKind: "departure",
      statement: "This hook is the only one that does.",
    },
  ],
} as const satisfies AgentHook
