import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushRouting = {
  id: "01a05b54-a908-7622-bd8f-8b4a54a24b9c",
  type: "module",
  slug: "push-routing",
  definition: "the path inside the app a push or a deep link opens",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path leading anywhere but inside the app opens nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deep link is read for its path and its query alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload naming no path opens nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here navigates.",
    },
  ],
} as const satisfies Module
