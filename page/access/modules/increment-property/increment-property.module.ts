import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const incrementProperty = {
  id: "01a0d4df-b918-755f-9c94-1f9784bd9c15",
  type: "page-type/module",
  slug: "increment-property",
  definition: "a number a page holds, added to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment finds its page as a patch does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment reaches at most one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment reaching no page answers null and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment adds one unless it states another amount.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment may set other values in the same write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment answers the count it left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is read and written back by `@akasha/page-service` in one step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Increments sent together are each counted.",
    },
  ],
} as const satisfies Module
