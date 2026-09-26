import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverTick = {
  id: "01a0657d-a75e-7005-b58c-0987d7b7e34f",
  type: "page-type/module",
  slug: "recipient-resolver-tick",
  definition:
    "a run where each seat with no agent is restarted for a message that matches the seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat that never ran is started as its spec says when a message it matches waits for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that never ran and whose spec says nothing of how to start it is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that ran before is revived rather than started again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spec whose work outruns its timeout is abandoned and taken up next tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spec that throws is said aloud.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The specs after a spec that throws are still walked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An aborted signal ends the run at the next spec boundary.",
    },
  ],
} as const satisfies Module
