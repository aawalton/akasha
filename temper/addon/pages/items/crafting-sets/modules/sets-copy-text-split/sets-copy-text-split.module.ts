import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCopyTextSplit = {
  id: "01a0623c-2df8-7447-8782-334bfe087f89",
  type: "page-type/module",
  slug: "sets-copy-text-split",
  definition: "cutting a string into fixed-length chunks without breaking a multi-byte character",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The cut point is nudged forward when the cut point lands inside a multi-byte character.",
    },
  ],
  createdAt: "2026-09-02T13:08:26.232Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
