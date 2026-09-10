import type { AgentHook } from "../agent-hook.page-type.types.ts"

export const blockSubagentAudit = {
  id: "01a06906-100c-7bd1-92e8-8157b8483c37",
  pageTypeSlug: "agent-hook",
  type: "agent-hook",
  slug: "block-subagent-audit",
  definition:
    "a refusal of an `akasha audit` a subagent calls, the seat that ran it calling it still",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An audit is refused for the memory a run has rather than for the changes a run writes.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is told from its seat by the subagent id the payload names.",
    },
    {
      invariantKind: "departure",
      statement: "A call the seat itself makes is not refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide that call from this hook.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal says a run's cost.",
    },
    {
      invariantKind: "departure",
      statement: "A run narrowed to named checks is refused as a whole run is.",
    },
    {
      invariantKind: "departure",
      statement: "A run narrowed to named paths is refused as a whole run is.",
    },
    {
      invariantKind: "departure",
      statement: "A run's cost is said as a figure measured rather than as a figure supposed.",
    },
    {
      invariantKind: "absence",
      statement: "Every akasha command but `audit` is no business of this hook.",
    },
    {
      invariantKind: "absence",
      statement: "A payload naming no subagent leaves the call as the call is.",
    },
    {
      invariantKind: "gap",
      statement: "A harness naming no subagent refuses nobody rather than refusing everyone.",
    },
  ],
} as const satisfies AgentHook
