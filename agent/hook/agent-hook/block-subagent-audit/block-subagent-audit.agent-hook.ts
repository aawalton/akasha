import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockSubagentAudit = {
  id: "01a06906-100c-7bd1-92e8-8157b8483c37",
  type: "page-type/agent-hook",
  slug: "block-subagent-audit",
  definition: "a refusal of a subagent's `akasha audit` naming `--file-path`",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run narrowed to named checks is let through, as a bare run is.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A call another program builds reaches the audit unrefused, `sh -c` and a script file alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent is told from its seat by the subagent id the payload names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call the seat itself makes is not refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide that call from this hook.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal says a run's cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`--file-path` is no argument of `akasha audit`, and a call naming it is refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A narrowed run asks the service as a bare run does, and judges no check where it is called.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run's cost is said as a figure measured rather than as a figure supposed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Every akasha command but `audit` is no business of this hook.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A payload naming no subagent leaves the call as the call is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload this cannot read judges nothing and exits so the dispatch passes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload that parses and is not an object is a payload this cannot read.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A harness naming no subagent refuses nobody rather than refusing everyone.",
    },
  ],
} as const satisfies AgentHook
