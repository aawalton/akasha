import type { AgentHook } from "../agent-hook.page-type.ts"

export const stateCompacting = {
  id: "01a06cc2-9c03-7cc6-8572-ca2c4935d05a",
  pageTypeSlug: "agent-hook",
  slug: "state-compacting",
  definition: "a seat stated as compacting while its context is being replaced by a summary",
  code: "ts",
  test: "ts",
  runsAt: ["PreCompact", "PostCompact"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is compacting from the first event until the second.",
    },
    {
      invariantKind: "departure",
      statement: "A seat waits on a compaction as a seat waits on a running task.",
    },
    {
      invariantKind: "departure",
      statement: "A compacting seat is drawn as waiting rather than as idle.",
    },
    {
      invariantKind: "departure",
      statement: "A field this hook does not write keeps the value that field already held.",
    },
    {
      invariantKind: "departure",
      statement: "A payload naming neither event is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no seat is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the summary a compaction wrote.",
    },
    {
      invariantKind: "gap",
      statement: "A compaction that never reaches its second event leaves the seat waiting.",
    },
  ],
} as const satisfies AgentHook
