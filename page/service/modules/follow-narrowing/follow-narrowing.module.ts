import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const followNarrowing = {
  id: "01a0d56f-77e5-72a7-8f84-7e47d24c6d90",
  type: "page-type/module",
  slug: "follow-narrowing",
  definition: "which changes a follow narrowed by a where is pushed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A narrowed follow is pushed a change to a page inside the narrow before or after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pages are inside the narrow is read once, when the follow is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change naming no page is pushed to a narrowed follow of its list.",
    },
  ],
} as const satisfies Module
