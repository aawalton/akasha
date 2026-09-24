import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rootParentQuery = {
  id: "01a06579-f3d9-7006-8368-78fe6c117de7",
  type: "page-type/module",
  slug: "root-parent-query",
  definition:
    "the date the Great Courses collection root last synced, taken as a gate and written back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that failed is refused rather than answered as the sync being due.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day written back is the day the sync ran rather than the day it was due.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The root's other values are merged, so writing the day loses none of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the record naming this provider is replaced, and every other one remains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write the store refused is answered as the day not recorded.",
    },
  ],
} as const satisfies Module
