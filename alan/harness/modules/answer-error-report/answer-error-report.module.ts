import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const answerErrorReport = {
  id: "01a08e53-e866-7aa9-87b1-bfd7879250ca",
  type: "page-type/module",
  slug: "answer-error-report",
  definition: "how code responds to a browser that sends an error",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every site taking error reports over http answers from here rather than from its own copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The origins a site answers cross-origin are passed in rather than written in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A site naming no shell origin is answered with no cross-origin headers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report is filed only once the shape it must have has taken it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filing that throws is answered rather than left to the router.",
    },
  ],
  createdAt: "2026-09-11T02:37:38.790Z",
  updatedAt: "2026-10-30T15:31:17.446Z",
} as const satisfies Module
