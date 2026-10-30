import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayNarrowTypes = {
  id: "01a06972-b45a-7000-a0e1-63aa928df10a",
  type: "page-type/module",
  slug: "day-narrow-types",
  definition: "the TypeScript types the modules that read Alan's days use",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A type here names no store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask that cannot answer has the reason rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row names its page rather than a file path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is taken before any limit.",
    },
  ],
  createdAt: "2026-09-03T22:45:20.090Z",
  updatedAt: "2026-10-30T16:46:41.604Z",
} as const satisfies Module
