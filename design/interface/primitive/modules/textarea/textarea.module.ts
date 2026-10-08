import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const textarea = {
  id: "01a05be9-d4c6-78ef-a0f5-7b6d2ae73b6a",
  type: "page-type/module",
  slug: "textarea",
  definition: "the many line text field",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Enter alone sends, Shift with Enter starts a new line, and Enter mid-word sends nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line break the phone asks for sends as Enter does, however the phone's key arrives.",
    },
  ],
  createdAt: "2026-09-01T07:40:46.150Z",
  updatedAt: "2026-09-28T01:55:44.000Z",
} as const satisfies Module
