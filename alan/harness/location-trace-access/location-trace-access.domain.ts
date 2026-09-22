import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const locationTraceAccess = {
  id: "01a05bc7-9129-700a-81c5-e2dfa20709ec",
  type: "page-type/domain",
  slug: "location-trace-access",
  definition: "the shape a recorded place is carried in, and how a batch of places is kept",
  parts: ["module/trace-insert", "module/trace-shape"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the phone a trace came from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a trace back out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trace is filed under the ESO day the trace was captured in rather than the day it arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trace is read and written as a page akasha has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch is kept whole or the call is refused.",
    },
  ],
} as const satisfies Domain
