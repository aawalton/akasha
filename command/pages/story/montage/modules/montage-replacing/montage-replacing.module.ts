import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const montageReplacing = {
  id: "01a17f37-7a37-7e8e-bd62-fd69d66aa2c6",
  type: "page-type/module",
  slug: "montage-replacing",
  definition: "where a montage starts, and the earlier montage lines a rerun of it replaces",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage starts at the last end settled on its turn before any montage line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Else it starts at the latest earlier turn's end, the last chapter's, or the opening.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rerun appends a montage superseding the latest one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage reruns only while its lines are the last of its turn's outcomes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rerun rolls from the chain the earlier montage rolled from.",
    },
  ],
  createdAt: "2026-10-27T21:15:04.630Z",
  updatedAt: "2026-10-27T22:26:04.226Z",
} as const satisfies Module
