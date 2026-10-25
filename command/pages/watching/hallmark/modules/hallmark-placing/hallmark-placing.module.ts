import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hallmarkPlacing = {
  id: "01a174ce-06e7-757b-aaf4-a0810f50f8f6",
  type: "page-type/module",
  slug: "hallmark-placing",
  definition: "the place each Hallmark title has in its series",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A title's place in its series counts from one in the order the titles aired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held page is placed again only where it already sits on a Hallmark shelf.",
    },
  ],
  createdAt: "2026-10-25T20:43:41.671Z",
  updatedAt: "2026-10-25T20:43:41.671Z",
} as const satisfies Module
