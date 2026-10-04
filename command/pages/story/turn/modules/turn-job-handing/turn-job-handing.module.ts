import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnJobHanding = {
  id: "01a1044a-7e52-7bd0-aa5c-665df122e31a",
  type: "page-type/module",
  slug: "turn-job-handing",
  definition: "how a turn's move hands a reviewer or recorder seat its job",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that is up is sent its job as a message, and keeps its session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat whose page went is resumed on its own session, with its job as its prompt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose page is there and whose process is gone is resumed the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat that never ran starts interactive as Alan's, under no seat, with its job as its prompt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job comes from a sender of its own, so no filter of stale notices drops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resume refused because the seat came up meanwhile sends the job instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A job that is neither sent, resumed nor started is told as a seat that did not start.",
    },
  ],
} as const satisfies Module
