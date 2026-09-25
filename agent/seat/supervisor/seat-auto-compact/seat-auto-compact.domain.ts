import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatAutoCompact = {
  id: "01a0c57d-e680-71fb-8cf9-90460d5d30a7",
  type: "page-type/domain",
  slug: "seat-auto-compact",
  definition: "a seat's context summarized by a supervisor",
  parts: ["module/supervisor-compact-decide", "module/supervisor-compact-poll"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat past the context ceiling compacts itself once that seat is idle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is asked to compact by the line a person would write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat asked to compact is not asked again until its context is under the ceiling.",
    },
  ],
} as const satisfies Domain
