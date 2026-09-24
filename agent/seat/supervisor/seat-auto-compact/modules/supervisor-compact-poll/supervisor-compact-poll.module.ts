import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorCompactPoll = {
  id: "01a0c57f-1c55-7ed6-9031-b6487631c187",
  type: "page-type/module",
  slug: "supervisor-compact-poll",
  definition: "a seat asked to compact on the beat that finds it idle past the ceiling",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ask is put on the seat's own pane rather than sent to the seat as a message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a seat is idle is read only where that seat is past the ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is judged idle by its turn rather than by its processes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat waiting only on a live shell or a live subagent is idle enough to compact.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat still running is not begun again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A supervisor with no agent yet holds no ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask the pane refused is no ask, so the next beat asks again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ceiling is read afresh on every beat, so a conditions page rewritten holds at once.",
    },
  ],
} as const satisfies Module
