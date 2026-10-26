import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useReadViewConfig = {
  id: "01a0e992-fa59-7719-a7a1-bcc31281ae3b",
  type: "page-type/module",
  slug: "use-read-view-config",
  definition: "a view's settings with its narrows read live against the pages they reach",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages a related narrow reaches are read live, so the narrow follows them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view named to the pages has its related narrows applied there instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a view reads none of the pages its related narrows reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view whose narrows are refused answers the refusal and no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's kinds below it are read from what each page type extends.",
    },
  ],
  createdAt: "2026-09-28T19:51:58.809Z",
  updatedAt: "2026-10-26T21:05:50.798Z",
} as const satisfies Module
