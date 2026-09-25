import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const stateCompacting = {
  id: "01a06cc2-9c03-7cc6-8572-ca2c4935d05a",
  type: "page-type/agent-hook",
  slug: "state-compacting",
  definition: "a seat stated as compacting while its context is being replaced by a summary",
  code: "ts",
  test: "ts",
  runsAt: ["PreCompact", "PostCompact", "Stop", "UserPromptSubmit"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is compacting from the first event until the second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat waits on a compaction as a seat waits on a running task.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compacting seat is drawn as waiting rather than as idle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field this hook does not write keeps the value that field already had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload naming none of the events this runs at is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the seat already holds is not written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no seat is left alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here refuses a call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the summary a compaction wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stops waiting on a compaction whose second event never comes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn ending or a prompt arriving closes a compaction still held open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No turn ends and no prompt arrives between the first event and the second.",
    },
  ],
} as const satisfies AgentHook
