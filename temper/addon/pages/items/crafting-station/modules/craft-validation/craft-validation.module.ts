import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftValidation = {
  id: "01a061c7-e874-7277-92dd-f1d3135b5172",
  type: "page-type/module",
  slug: "craft-validation",
  definition: "whether an item link is worth keeping, learning or studying",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reconstructed or transmuted item is needed for research by no character.",
    },
  ],
  createdAt: "2026-09-02T11:01:26.260Z",
  updatedAt: "2026-10-20T00:27:31.133Z",
} as const satisfies Module
