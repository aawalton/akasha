import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requireNumericKey = {
  id: "01a060b6-99a2-762f-9fd9-585495c025f4",
  type: "page-type/module",
  slug: "require-numeric-key",
  definition: "a Lua table key read back as its own written number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Lua table hands every key over as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key that is no number is refused rather than given back as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the key and the label the caller handed in.",
    },
  ],
  createdAt: "2026-09-02T06:02:54.754Z",
  updatedAt: "2026-09-22T13:49:49.000Z",
} as const satisfies Module
