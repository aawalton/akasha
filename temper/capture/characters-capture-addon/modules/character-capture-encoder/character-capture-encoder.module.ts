import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureEncoder = {
  id: "01a0616b-14ad-7ea1-804f-21d933e4640c",
  type: "page-type/module",
  slug: "character-capture-encoder",
  definition: "a captured character build written out as a build hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What the add-on writes is read back by the build codec as the build captured.",
    },
  ],
  createdAt: "2026-09-02T09:20:02.733Z",
  updatedAt: "2026-10-20T17:44:08.462Z",
} as const satisfies Module
