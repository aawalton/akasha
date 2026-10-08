import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const complexityRows = {
  id: "01a0680f-d1b7-76ad-870a-daf5928ec28b",
  type: "page-type/module",
  slug: "complexity-rows",
  definition: "one row per function or per file holding what that one measured",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that will not open is passed over rather than counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row names its file relative to the checkout root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming one file measures that file rather than the checkout.",
    },
  ],
  createdAt: "2026-09-03T16:17:42.327Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
