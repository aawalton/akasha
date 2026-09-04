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
      statement: "A startup replaces the context.",
    },
    {
      invariantKind: "departure",
      statement: "A clearing replaces the context.",
    },
    {
      invariantKind: "departure",
      statement: "A compaction replaces the context.",
    },
    {
      invariantKind: "departure",
      statement: "A startup clears the record.",
    },
    {
      invariantKind: "departure",
      statement: "A clearing clears the record.",
    },
    {
      invariantKind: "departure",
      statement: "A compaction clears the record.",
    },
    {
      invariantKind: "departure",
      statement: "One agent's readings are cleared rather than another's.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's own session raises this event carrying the name of its seat.",
    },
    {
      invariantKind: "departure",
      statement: "The payload names the subagent acting.",
    },
    {
      invariantKind: "departure",
      statement: "The environment names only the seat.",
    },
    {
      invariantKind: "departure",
      statement: "The agent cleared is the agent acting rather than that agent's seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's subagents keep their records when the seat's own context is replaced.",
    },
    {
      invariantKind: "departure",
      statement: "With no agent named nothing is cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A record that cannot be reached is left as the record stands.",
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
    {
      invariantKind: "gap",
      statement: "A record an ended agent left behind is taken away.",
    },
  ],
} as const satisfies AgentHook
