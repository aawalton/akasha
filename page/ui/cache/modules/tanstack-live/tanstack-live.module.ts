import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tanstackLive = {
  id: "01a05cba-9cbc-7f0a-9fe4-2beece336d54",
  type: "page-type/module",
  slug: "tanstack-live",
  definition: "a live query pipeline acquired by slug and read as it changes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is acquired as a target only where the reader's roster names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pages are acquired by name only where the reader's roster names their page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target the reader may not read holds no view back from being ready.",
    },
  ],
} as const satisfies Module
