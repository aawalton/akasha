import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lrclibSchema = {
  id: "01a06262-ff4c-7003-9b41-cc6b930ce9df",
  type: "page-type/module",
  slug: "lrclib-schema",
  definition: "the shape an LRCLIB answer takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An LRCLIB search answers a bare list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record LRCLIB says nothing about instrumentality for is not instrumental.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
  createdAt: "2026-09-02T13:50:50.188Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Module
