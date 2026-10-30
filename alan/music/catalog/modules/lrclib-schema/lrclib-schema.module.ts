import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lrclibSchema = {
  id: "01a06262-ff4c-7003-9b41-cc6b930ce9df",
  type: "page-type/module",
  slug: "lrclib-schema",
  definition: "the shape of a reply from LRCLIB",
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
  updatedAt: "2026-10-30T16:27:33.330Z",
} as const satisfies Module
