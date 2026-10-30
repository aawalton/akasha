import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const traceShape = {
  id: "01a05bc7-9129-700b-ba7b-804847cebb2b",
  type: "page-type/module",
  slug: "trace-shape",
  definition: "what Alan's phone sends about each place Alan goes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trace states the phone the trace came from and the count that phone gave the trace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything beyond the place and the moment is optional.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here exists at runtime.",
    },
  ],
  createdAt: "2026-09-01T07:03:20.617Z",
  updatedAt: "2026-10-30T15:41:28.252Z",
} as const satisfies Module
