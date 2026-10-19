import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clientStream = {
  id: "01a0628b-a005-7127-97c7-0f8541a03fb6",
  type: "page-type/module",
  slug: "client-stream",
  definition: "whether a request wants a stream",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request body that is no JSON is taken as no stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing request body is taken as no stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the JSON boolean `true` under the body's `stream` key is taken as a stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `stream` key below the body's top level is taken as no stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body key beside `stream` never refuses the parse.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here throws.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here tells a body naming no `stream` from a body that is no JSON.",
    },
  ],
  createdAt: "2026-09-02T14:35:12.773Z",
  updatedAt: "2026-10-19T19:04:07.223Z",
} as const satisfies Module
