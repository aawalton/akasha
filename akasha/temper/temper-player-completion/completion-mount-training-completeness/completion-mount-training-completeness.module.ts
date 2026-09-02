import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionMountTrainingCompleteness = {
  id: "01a06108-2ff3-7f44-b36b-b96b671954b0",
  pageTypeSlug: "module",
  slug: "completion-mount-training-completeness",
  definition: "whether a character has trained a mount to its limit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One of the three mount statistics is asked after by naming it.",
    },
  ],
} as const satisfies Module
